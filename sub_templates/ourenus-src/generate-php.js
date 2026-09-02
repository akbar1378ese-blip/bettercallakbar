import fs from "fs";
import path from "path";

export function generateIndexPHP(buildDir) {
  const htmlFile = path.join(buildDir, "index.html");
  const phpFile = path.join(buildDir, "index.php");

  try {
    // Read the generated index.html file
    const htmlContent = fs.readFileSync(htmlFile, "utf-8");

    // PHP Template with embedded HTML content
    const phpTemplate = `<?php

    // Ensure the HTTP_USER_AGENT is set; if not, redirect to the home page
    if (empty($_SERVER['HTTP_USER_AGENT'])) {
        header('Location: /');
        exit();
    }
    
    // Check PHP version for str_contains function
    if (!function_exists('str_contains')) {
        die('Please upgrade your PHP version to 8.0 or above');
    }
    
    $isHtmlRequest = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'text/html');
    define('BASE_URL', 'https://yourdomain.com:443'); // Set the appropriate URL
    
    // Generate the full URL with the request URI
    $requestUrl = BASE_URL . ($_SERVER['REQUEST_URI'] ?? '') . ($isHtmlRequest ? '/info' : '');
    
    // Initialize cURL session
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $requestUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER => true,
        CURLOPT_TIMEOUT => 17,
        CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'],
        CURLOPT_CUSTOMREQUEST => 'GET',
    ]);
    
    $response = curl_exec($ch);
    
    // Handle cURL error
    if ($response === false) {
        die('cURL error: ' . curl_error($ch));
    }
    
    // Split the headers and body from the response
    $headerEndPos = strpos($response, "\\r\\n\\r\\n");
    if ($headerEndPos === false) {
        die('Invalid response format.');
    }
    
    $headerText = substr($response, 0, $headerEndPos);
    $responseBody = substr($response, $headerEndPos + 4);
    
    // Serve HTML content if requested
    if ($isHtmlRequest) {
        ?>
        ${htmlContent.replace(
          /<\?(php|=)/g,
          "<\\?$1"
        )} <!-- Escaped PHP tags for safety -->
        <?php
        return;
    }
    
    // Forward the necessary headers from the cURL response
    $isValidHeader = false;
    foreach (explode("\\r\\n", $headerText) as $i => $line) {
        if ($i === 0) continue;
        if (strpos($line, ": ") !== false) {
            list($key, $value) = explode(": ", $line, 2);
            if (in_array(strtolower($key), ['content-disposition', 'content-type', 'subscription-userinfo', 'profile-update-interval'])) {
                header("$key: $value");
                $isValidHeader = true;
            }
        }
    }
    
    if (!$isValidHeader && !$isHtmlRequest) {
        die("Error! No valid headers found.");
    }
    
    // Output the response body
    echo $responseBody;
    
    ?>
    `;

    // Write the index.php file
    fs.writeFileSync(phpFile, phpTemplate, "utf-8");
    console.log("Generated index.php successfully");
  } catch (error) {
    console.error("Error generating index.php:", error);
  }
}

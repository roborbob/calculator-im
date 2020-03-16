<?php
    ini_set('display_errors', 1);

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: X-Requested-With, privatekey');
        header('Access-Control-Allow-Credentials: true');
        header("Cache-Control: no-cache");
    
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }


    // Get the IP address, cant seem to reach the HTTP_CLIENT_IP this way, needs further work.
    function getUserIpAddr(){
        if(!empty($_SERVER['HTTP_CLIENT_IP'])){
            //ip from share internet
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
            //ip pass from proxy
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }else{
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
    
    $ip_address = getUserIpAddr();

    // Get POST request details
    $json = file_get_contents("php://input");

    // Converts it into a PHP object
    $data = json_decode($json);  
    
    // Store variables
    $result = $data->result;
    $time = $data->time;

    $dataArray = array($result, $ip_address, $time);
    
    $filename = './data.csv';
   
    // Check if we are appending new data or creating new a whole new file
    if(file_exists($filename)){
        $fs = fopen("data.csv","a");
        fputcsv($fs, $dataArray);
        fclose($fs);
        
    } else {
        $headers = array("Results","IP","Date");
        $fh = fopen("data.csv", "w");
        fputcsv($fh, $headers);
        fputcsv($fh, $dataArray);
        fclose($fh);
    }   
?>
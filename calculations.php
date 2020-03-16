<html>
    <head>     
        <title>Calculator</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            h1 {
                text-align: center;
                font-weight: 300;
                margin: 20px;
                font-familY: "Helvetica";
            }
            table {
                margin: 0 auto;
                border: 1px solid black;
                width: fit-content;
            }
            tbody {
                background: lightblue;
            }
            td {
                font-weight: 300;
                font-family: "Helvetica";
                font-size: 15px;
                padding: 10px;
                width: 150px;
            }
        </style>
    </head>
    <body> 
        <h1>Calculator Log</h1>   
        <div class="container">
            <table>
                <tbody>
                    <?php 
                        if (($csvfile = fopen("data.csv", "r")) !== false) {                       
                            while(($csvdata = fgetcsv($csvfile, 1000, ",")) !== false) {
                                echo "<tr>";
                                echo "<td>".$csvdata[0]."</td>";
                                echo "<td>".$csvdata[1]."</td>";
                                echo "<td>".$csvdata[2]."</td>";
                                echo "<td>".$csvdata[3]."</td>";
                                echo "</tr>";
                            }                     
                        } else {
                            echo "<tr>There are no results to show</tr>";
                        }
                    ?>
                </tbody>
            <table>
        </div>
    </body>
</html>
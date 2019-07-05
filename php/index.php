<?php
$returnData = (object)[
	"success" => false,
    "status"  => "",
    "error"   =>false,
    "messages"=>array(),
    "data"    =>(object)[]
];


$key      =  array("Person", "Place", "Location", "Venue", "City", "Language", "Product");
$name     = isset($_POST['newName'])?$_POST['newName']:'';
$value    = isset($_POST['newValue'])?$_POST['newValue']:'';
$validate = in_array($value, $key);


// error handling
register_shutdown_function( "fatal_handler" );

function fatal_handler() {
    $errfile = "unknown file";
    $errstr  = "shutdown";
    $errno   = E_CORE_ERROR;
    $errline = 0;

    $error = error_get_last();

    if( $error !== NULL) {
        $errno   = $error["type"];
        $errfile = $error["file"];
        $errline = $error["line"];
        $errstr  = $error["message"];
        $errorReply = (object)[
			"success"  => false,
		    "status"   => 500,
		    "error"    => true,
		    "messages" => array("There was an internal server error processing your request."),
		    "data"     => (object)[
				"name" => $name,
				"value"=>$value
			]
		];

		echo json_encode($errorReply);
    }
}


// validating
if( ( $name == '' ) || (!$validate) ){
	$returnData->success  = false;
	$returnData->status   = 422;
	$returnData->error    = true;
	$returnData->messages = array("The syntax of the request is incorrect.");
}else{
	$returnData->success  = true;
	$returnData->status   = 200;
	$returnData->error    = false;
	$returnData->messages = array("The list was successfully submitted and processed.");
}
$returnData->data = (object)[
		"name"  => $name,
		"value" => $value
	];
echo json_encode($returnData);
?>

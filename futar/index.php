<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        require_once 'futar/getfutar.php';
        break;
    case 'POST':
        require_once 'futar/postfutar.php';
        break;
    case 'DELETE':
        require_once 'futar/deletefutar.php';
        break;
    case 'PUT':
        require_once 'futar/putfutar.php';
        break;
    default:
        break;
}
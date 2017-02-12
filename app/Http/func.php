<?php

namespace App\Http\Controllers;
use PHPExcel;
use PHPExcel_IOFactory;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use App\Http\Requests;
use App\Http\Requests\UserFormRequest;
use App\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Created by PhpStorm.
 * User: Vladislav
 * Date: 10.04.2016
 * Time: 18:59
 */

function Init($file)
{
    $fileLists = array();
    if(!$file)
    {
        $file = new PHPExcel();
        //    $file->
    }


    $xls = PHPExcel_IOFactory::load($file);
    $sheetCount = $xls->getSheetCount();

    for($i = 0; $i < $sheetCount; $i++)
    {
        $activList = new Lists;
        $activList->Init($xls->setActiveSheetIndex($i));
        $fileLists[$i] = $activList;
    }

}
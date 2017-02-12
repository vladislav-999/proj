<?php


namespace App\Http\Controllers;

use PHPExcel;
use PHPExcel_IOFactory;
use PHPExcel_Cell;
use PHPExcel_Shared_Date;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;

define("FORMAT", 'd.m.Y');

/*
use Illuminate\Routing\Controller;
use App\Http\Requests;
use App\Http\Requests\UserFormRequest;
use App\User;
use App\Http\Controllers\Response;
use Symfony\Component\HttpFoundation\File\UploadedFile;
*/
class Cell
{
    public $data;
    public $width;
    public $height;
    public $fontSize;
    public $fontFamily;

    function Cell($data, $width, $height, $fontSize, $fontFamily)
    {
        $val = $data->getValue();

        //date
        if(PHPExcel_Shared_Date::isDateTime($data)) {
            $val = date('d.m.Y', PHPExcel_Shared_Date::ExcelToPHP($val));
        }

        //for incorrect formulas take old value
        if((substr($val,0,1) === '=' ) && (strlen($val) > 1)){
            $val = $data->getOldCalculatedValue();
        }
        $this->data = $val;
        $this->width = $width;
        $this->height = $height;
        $this->fontSize = $fontSize;
        $this->fontFamily = $fontFamily;
    }

}

class Lists
{
    public $numList;   //номер листа
    public $nameList;
    public $union;
    public $nRow;      //кол-во строк
    public $nCol;      //кол-во столбцов
    public $nColNumb;      //кол-во столбцов
    public $cells = array(); //асоцеативный массив ячеек
    public $nCells = array();


    public function Init($listActive)
    {
        $this->nRow = $listActive->getHighestRow();
        $this->nCol= $listActive->getHighestColumn();
        $this->nColNumb = PHPExcel_Cell::columnIndexFromString(
            $listActive->getHighestColumn());
        $this->nameList = $listActive->getTitle();
        $this->union = $listActive->getMergeCells();

        if($this->nRow < 100) {
            $this->nRow = 100;
        }
        if($this->nColNumb < 26) {
            $this->nColNumb = 26;
            $this->nCol = 'Z';
        }
        $col = 'A';
        for ($c = 0; $c < $this->nColNumb; $c++) {
            for ($r = 1; $r < $this->nRow; $r++) {
                $cells = new Cell;
                if (!$listActive->getCell($col . $r)) {
                    $cells->Cell('', 10, '20px', 12, 'Arial');
                    $this->cells[$col . $r] = $cells;
                }
                else{
                    $cells->Cell($listActive->getCell($col . $r),
                        (int)$listActive->getColumnDimension($col)->getWidth(),
                        (int)$listActive->getRowDimension($r)->getRowHeight(),
                        $listActive->getStyle($col . $r)->getFont()->getSize(),
                        $listActive->getStyle($col . $r)->getFont()->getName()
                    );
                    $this->cells[$col . $r] = $cells;
                }
                //    $cells->printCell();
            }
            $col++;
        }

        $col = 'A';
        for ($r = 0; $r <= $this->nColNumb; $r++) {
            $this->nCells[$r] = $col;
            $col++;

        }

    }

}

class File
{
    var $fileName;
    var $sheetCount;
    var $fileLists = array();

    function File()
    {
        if($this->fileName != '') {
            $file = 'uploads/' . $this->fileName;

            $xls = PHPExcel_IOFactory::load($file);
            $this->sheetCount = $xls->getSheetCount();

            for ($i = 0; $i < $this->sheetCount; $i++) {
                $activList = new Lists;
                $activList->numList = $i;
                $activList->Init($xls->setActiveSheetIndex($i));
                $this->fileLists[$i] = $activList;
            }

            $col = 'A';
            $r = 4;
            $list = $col . $r;

            $list = $this->fileLists[0]->cells;
            //return json_encode($this->fileLists);
        }
        else {
            $file = new PHPExcel();
        }
    }

}


class TableController extends Controller
{
    //
    public function CreateTable()
    {
        if(Request::ajax()){
            $file = $_POST['file'];

            $currentFile = new File();
            $currentFile->fileName = $file;
            $currentFile->File();

            Session::put('file', $currentFile);

            return json_encode($currentFile);
        }
    }
}


/*
    public function Init($file)
    {
        $fileLists = array();
        if(!$file)
        {
            $file = new PHPExcel();
            //    $file->
        }
        $this->file = $file;

        $xls = PHPExcel_IOFactory::load("uploads/".$file);
        $sheetCount = $xls->getSheetCount();

        for($i = 0; $i < $sheetCount; $i++)
        {
            $activList = new Lists;
            $activList->Init($xls->setActiveSheetIndex($i));
            $this->fileLists[$i] = $activList;
        }
        return $this->fileLists;
    }

 */
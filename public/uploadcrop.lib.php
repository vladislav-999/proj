<?php 

/*
 * Copyright (c) 2010 http://www.maksimpetrenko.com
 * "Upload & crop"
 * Date: 2010-11-03
 * Ver 0.01
 * 
 */

class UploadCrop {

	private $upload_dir = "uploads"; 									// Директорія для збереження зображень
	private $max_file = "5242880";										// максимальний розмір файлу у байтах (5Mb)
	private $types = array('image/gif', 'image/png', 'image/jpeg'); 	// Дозволені MIME типи малюнків
	private $max_width = "500";											// Максимальна дозволена ширина для зображень
	private $max_height = "500";										// Максимальна дозволена висота для зображень
	private $thumb_width = "100";										// Ширина для thumbnail зображення
	private $thumb_height = "100";										// Висота для thumbnail зображення
	private $errorBox = array (											// Массив помилок
		"forbiddenFiles" => "Заборонений тип файлу",
		"bigSize"		 => "Великий розмір файлу"
	);

	function __construct () {

		$this->__createDir ($this->upload_dir);
	
	}

	/*
	*	Функція завантаження малюнку
	*	Повертає массив з розмірів для завантаженого малюнку, і розміри для thumbnail малюнка
	*/
	public function uploadImage () {

		$new_image = $this->upload_dir . "/" . $_FILES['userfile']['name'];

		if (!in_array($_FILES['userfile']['type'], $this->types)) {
			$this->__errorMessage["forbiddenFiles"];
		}

		if ($_FILES['userfile']['size'] > $this->max_file) {
			$this->__errorMessage["bigSize"];
		}

		$source = $this->__toJpeg ($_FILES['userfile']);

		$source = $this->__resizeImage ($source);

		imagejpeg($source, $new_image, 90);

		$sizes['width'] = imagesx($source);
		$sizes['height'] = imagesy($source);
		$sizes['thumbW'] = $this->thumb_width;
		$sizes['thumbH'] = $this->thumb_height;

		return $sizes;
	}
	
	/*
	* Функція створення thumbnail малюнка
	* Повертає ім`я thumbnail малюнка 
	*/
	public function createThumbnailImage($image, $width, $height, $start_width, $start_height){

		$newImage = imagecreatetruecolor($this->thumb_width,$this->thumb_height);

		$source = imagecreatefromjpeg($this->upload_dir . "/" . $image);

		imagecopyresampled($newImage,$source,0,0,$start_width,$start_height,$this->thumb_width,$this->thumb_height,$width,$height);

		$thumb_image_name = $this->upload_dir . "/min_" . $image;

		imagejpeg($newImage,$thumb_image_name,90);

		chmod($thumb_image_name, 0777);

		return $thumb_image_name;

	}
	
	private function __createDir ($dir) {

		if(!is_dir($dir)){
			mkdir($dir, 0777);
			chmod($dir, 0777);
		}

	}
	
	private function __toJpeg ($file) {

		if ($file['type'] == 'image/jpeg') 
			$source = imagecreatefromjpeg($file['tmp_name']); 
		elseif ($file['type'] == 'image/png') 
			$source = imagecreatefrompng($file['tmp_name']); 
		elseif ($file['type'] == 'image/gif') 
			$source = imagecreatefromgif($file['tmp_name']); 
		else
			return false;

		return $source;

	}
	
	private function __resizeImage ($image) {

		$width = imagesx($image); 
		$height = imagesy($image);

		if ($width > $this->max_width) {

			$scale = $this->max_width/$width;
			$newImageWidth = ceil($width * $scale);
			$newImageHeight = ceil($height * $scale);

			$newImage = imagecreatetruecolor($newImageWidth,$newImageHeight);

			imagecopyresampled($newImage,$image,0,0,0,0,$newImageWidth,$newImageHeight,$width,$height);

			return $newImage;
		} else {
			return $image;
		}


	}

	private function __errorMessage ($error) {

		die ($errorBox[$error]);

	}

}

?>
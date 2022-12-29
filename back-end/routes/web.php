<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CertificateController;



Route::get('/certificates/{domain}', 'App\Http\Controllers\CertificateController@show');


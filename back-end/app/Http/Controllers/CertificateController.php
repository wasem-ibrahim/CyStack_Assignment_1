<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;

class CertificateController extends Controller
{
    public function show($domain)
    {
        try {
            $cacheKey = md5($domain);
            $data = Cache::get($cacheKey);

            if ($data === null) {
                $url = "https://crt.sh/?q=$domain&output=json";
                $response = Http::get($url);

                if (!$response->successful()) {
                    throw new \Exception('API request failed');
                }

                $data = $response->json();
                $certificateInfo = [];
                foreach ($data as $cert) {
                    $certificateInfo[] = [
                        'id' => $cert['id'],
                        'issuer' => $cert['issuer_name'],
                        'subject' => $cert['name_value'],
                        'valid_from' => $cert['not_before'],
                        'valid_to' => $cert['not_after'],
                    ];
                }

                $data = $certificateInfo;
                Cache::put($cacheKey, $data, 60);
            }
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}

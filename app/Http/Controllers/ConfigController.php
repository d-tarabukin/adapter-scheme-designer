<?php
declare(strict_types=1);

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Symfony\Component\Yaml\Yaml;

class ConfigController extends Controller
{
    public function index(Request $request)
    {
        // TODO: handle parsing exceptions
        $requestBody = \json_decode($request->getContent(), true);

        $config = Yaml::dump($requestBody, 4, 4, Yaml::DUMP_EMPTY_ARRAY_AS_SEQUENCE);
        $configName = $requestBody['method'] . '.yaml';

        return response()
            ->streamDownload(function() use ($config) {
           echo $config;
        }, $configName, ['Content-Type' => 'text/vnd.yaml']);
    }
}

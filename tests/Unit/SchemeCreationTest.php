<?php

namespace Tests\Unit;

use Symfony\Component\Yaml\Yaml;
use Tests\TestCase;

class SchemeCreationTest extends TestCase
{
    public function testPositive()
    {
        $jsonConfig = '{"method":"foo","version":1234,"sign":"cc0041","handlers":{"status":[]}}';
        $response = $this->json('POST', 'api/create-config', \json_decode($jsonConfig, true));
        $this->assertSame(Yaml::dump(\json_decode($jsonConfig, true), 4, 4, Yaml::DUMP_EMPTY_ARRAY_AS_SEQUENCE), $response->streamedContent());
    }
}

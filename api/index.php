<?php

header('Content-Type: application/json; charset=utf-8');

$cpf = $_POST['key']['cpf'];

// SELECT * from usuarios WHERE cpf = '25383193820';

echo json_encode(
  [
    'result' => array(
      'status' => 1,
      'data' => array(
        'name' => 'Gabriela',
        'number' => '+55 11 96571-2889',
        'email' => 'gaby@linkedin.com.br',
        'cpf' => $cpf
      ),
      'purchases' => array(
        'ammout' => 5
      ),
      'more' => array(
        'farma' => false,
        'dependencies' => array(
          'check' => true,
          'ammout' => 2
        )
      )
    )
  ]
);

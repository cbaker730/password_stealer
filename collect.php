<?php
// collect.php
$log = 'dump.log';
$collect = array();
foreach ($_GET as $k => $v) {
  $collect[] = "$k: $v";
}
$line = implode(' | ', $collect)."\n";
file_put_contents($log, $line, FILE_APPEND);
?>

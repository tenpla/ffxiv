<?php
session_start();

// 14用
define('Consumer_Key', 'X4xybjCSQ3nmiTtnC1Z1F7IoL');
define('Consumer_Secret', 'qgMb3atzr3QatmrKTjrY3rsc2wAnnIoBklKuXnFYppOpoGCSGp');

//Callback URL
define('Callback', 'https://ff14.appare.co.uk/callback.php');

//ライブラリを読み込む
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

//TwitterOAuthのインスタンスを生成し、Twitterからリクエストトークンを取得する
$connection = new TwitterOAuth(Consumer_Key, Consumer_Secret);
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => Callback));

//リクエストトークンはcallback.phpでも利用するのでセッションに保存する
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

// Twitterの認証画面へリダイレクト
$url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
header('Location: ' . $url);

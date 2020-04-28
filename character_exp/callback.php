<?php
session_start();

// 14用
define('Consumer_Key', 'X4xybjCSQ3nmiTtnC1Z1F7IoL');
define('Consumer_Secret', 'qgMb3atzr3QatmrKTjrY3rsc2wAnnIoBklKuXnFYppOpoGCSGp');

//ライブラリを読み込む
require "vendor/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

//oauth_tokenとoauth_verifierを取得
if($_SESSION['oauth_token'] == $_GET['oauth_token'] and $_GET['oauth_verifier']){

	//Twitterからアクセストークンを取得する
	$connection = new TwitterOAuth(Consumer_Key, Consumer_Secret, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
	$access_token = $connection->oauth('oauth/access_token', array('oauth_verifier' => $_GET['oauth_verifier'], 'oauth_token'=> $_GET['oauth_token']));

	//取得したアクセストークンでユーザ情報を取得
	$user_connection = new TwitterOAuth(Consumer_Key, Consumer_Secret, $access_token['oauth_token'], $access_token['oauth_token_secret']);
	$user_info = $user_connection->get('account/verify_credentials');

	// ユーザ情報の展開
	// var_dump($user_info);

	//適当にユーザ情報を取得
	$token_type = 'Twitter';
	$id = $user_info->id;
	$name = $user_info->name;
	$user_access_token = $access_token['oauth_token'];
	$screen_name = $user_info->screen_name;
	$profile_image_url_https = $user_info->profile_image_url_https;
	$profile_image_200x200_url_https = str_replace('normal', '200x200', $profile_image_url_https);
	$text = $user_info->status->text;
	$description = $user_info->description;
	$profile_background_image_url_https = $user_info->profile_background_image_url_https;
	$profile_banner_url = $user_info->profile_banner_url;

	//各値をセッションに入れる
	$_SESSION['access_token'] = $access_token;
	$_SESSION['twitter_id'] = $id;
	$_SESSION['name'] = $name;
	$_SESSION['screen_name'] = $screen_name;
	$_SESSION['text'] = $text;
	$_SESSION['profile_image_url_https'] = $profile_image_200x200_url_https;
	$_SESSION['description'] = $description;
	$_SESSION['profile_background_image_url_https'] = $profile_background_image_url_https;
	$_SESSION['profile_banner_url'] = $profile_banner_url;


	// ユーザデータベース
	// データベース接続
	$db_host = 'mysql136.phy.lolipop.lan';
	$db_name = 'LA09960615-ff14';
	$db_user = 'LA09960615';
	$db_pass = 'Naokingff14';


	// データベース接続クラスPDOのインスタンス$dbhを作成する
	try {
			$dbh = new PDO("mysql:host={$db_host};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8mb4"));

			// PDOExceptionクラスのインスタンス$eからエラーメッセージを取得
	} catch (PDOException $e) {
			// 接続できなかったらvar_dumpの後に処理を終了する
			var_dump($e->getMessage());
			exit;
	}

	// IDがなければ追加するSQL
	$sql = 'INSERT INTO users(
      twitter_id,
			twitter_name,
			access_token) VALUES(:twitter_id,:twitter_name,:access_token) ON DUPLICATE KEY UPDATE
			twitter_id = VALUES(twitter_id),
			twitter_name = VALUES(twitter_name),
			access_token = VALUES(access_token);';
	// SQLをセット
	$stmt = $dbh->prepare($sql);

	// SQLを実行
	$stmt->bindValue(':twitter_id',$id,PDO::PARAM_INT);
	$stmt->bindValue(':twitter_name',$screen_name,PDO::PARAM_STR);
	$stmt->bindValue(':access_token',$user_access_token,PDO::PARAM_STR);

	$stmt->execute();

	header('Location: index.php');
	exit();
}else{
	header('Location: index.php');
	exit();
}
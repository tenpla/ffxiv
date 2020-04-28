<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Content-type: text/html; charset=utf-8");

// URLを取得
$url = $_SERVER['HTTP_HOST'];

// データベース接続
$db_host = 'mysql136.phy.lolipop.lan';
$db_name = 'LA09960615-ff14';
$db_user = 'LA09960615';
$db_pass = 'Naokingff14';

$dsn = 'mysql:host='.$db_host.'; dbname='.$db_name.'; charset=utf8mb4';

// データベース接続クラスPDOのインスタンス$dbhを作成する
try {
	$dbh = new PDO("mysql:host={$db_host};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass);

	// PDOExceptionクラスのインスタンス$eからエラーメッセージを取得
} catch (PDOException $e) {
	// 接続できなかったらvar_dumpの後に処理を終了する
	var_dump($e->getMessage());
  $err_msg ="データベースへの接続に失敗しました。";
	exit;
}

$err_msg ='';
$msg_js ='<script type="text/javascript">
	$("#message").fadeIn("slow", function () {
		$(this).delay(3000).fadeOut("slow");
	});
	</script>';
$msg = "データベースからボード情報を読み込みました。";
$stmt = $dbh->prepare("SELECT
	id,
	twitter_id,
	twitter_name,
	access_token,
	character_id,
	created_at,
	updated_at,
	deleted_at,
	is_deleted
from users WHERE is_deleted = 0");
//executeでクエリを実行
$stmt->execute();

//fetchAllで結果を全件配列で取得
$data  = $stmt->fetchAll();

$keyIndex = array_search($_SESSION['access_token']['oauth_token'], array_column($users_data, 'access_token'));
$user_data = $users_data[$keyIndex];
// セッションに user_id を追加
$_SESSION['user_id'] = $user_data['id'];
$user_id = $user_data['id'];
$session_twitter_name = $_SESSION['screen_name'];
?>
<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width">
  <title>Status Charts</title>
  <meta name="description" content="データを記録しておくことができます。">
  <link rel="icon" href="favicon.ico">
  <link rel="stylesheet" type="text/css" href="assets/css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="assets/js/main.js"></script>

<?php
	// 変数をjavascriptへ
	echo "<script>var php = {user_name: '".$_SESSION['name']."', access_token:'".$_SESSION['access_token']['oauth_token']."', user_id:".(int)$user_data['id']."};</script>";
?>

</head>
<body id="top">
  <div id="container">
	<header><h1>Status Charts</h1></header>
		<section id="login">
<?php
$message_logged_in = "<div id='logged_in'><div class='avater'><img src=".$_SESSION['profile_image_url_https']."></div><div class='wrapper'><div class='user_name'>". $_SESSION['name'] . "</div><p class='small button logout simple'><a href='logout.php'>ログアウト</a></p></div></div>";
if(!isset($_SESSION['access_token'])){
	echo "<div class='text_on_board'><p>Twitter アカウントでログインすると<br />グラフデータを保存しておくことが出来ます。</p></div>";
	echo "<div class='login_button_wrapper'><div id='login_twitter' class='button shake'><a href='login.php'><span class='icon-twitter'></span>Twitter ID でログイン</a></div></div>";
}else{
	callback.phpからセッションを受け継ぐ
	echo "<div id='status'><p>ID：". $_SESSION['id'] . "</p>";
	echo "<p>名前：". $_SESSION['name'] . "</p>";
	echo "<p>スクリーン名：". $_SESSION['screen_name'] . "</p>";
	echo "<p>最新ツイート：" .$_SESSION['text']. "</p>";
	echo "<p><img src=".$_SESSION['profile_image_url_https']."></p>";
	echo "<p>description：" .$_SESSION['description']. "</p>";
	echo "<p><img src=".$_SESSION['profile_banner_url']."></p>";
	echo "<p>access_token：". $_SESSION['access_token']['oauth_token'] . "</p>";
	echo $message_logged_in;
}
?>

		</section>
		<section id="main_content">
      <div class="wrapper box">

<?php
// ログインしてるならボード追加ボタン配置
$preview = '<div class="button_wrapper"><button id="preview">表示する</button></div>';
if(isset($_SESSION['access_token'])){
  echo $preview;
}
?>

      </div>
    </section>
  </div>
  <div id="message">
<?php
  if($msg !=='') echo '<p class="green">'.$msg.'</p>'.$msg_js;
  if($err_msg !=='') echo '<p class="error">'.$err_msg.'</p>'.$msg_js;
?>
		</div>
		<div id="overlay" style="display:none;"></div>
</body>
</html>
/**
 * 訪看スタディ「先行案内」の受付フォームを Google フォームで作る
 *
 * 使い方
 * 1. https://script.google.com を開き「新しいプロジェクト」
 * 2. このファイルの中身をすべて貼り付けて保存
 * 3. 関数「createWaitlistForm」を選んで「実行」（初回はGoogleの許可を求められます）
 * 4. 実行ログに出る「回答用URL」を LP の index.html の WAITLIST_URL に入れる
 *
 * 回答はフォームの「回答」タブとスプレッドシート（自動で作成）で見られます。
 */
function createWaitlistForm() {
  var form = FormApp.create('訪看スタディ 先行案内のお申し込み');
  form.setDescription(
    '訪問看護師のための学習アプリ「訪看スタディ」の公開のお知らせを、メールでお送りします。\n' +
    '公開の時期と購入の方法、無料体験の始め方をご案内します。登録に料金はかかりません。\n\n' +
    'ご入力いただいたメールアドレスは、訪看スタディのお知らせにだけ使います。いつでも配信を止められます。'
  );
  form.setConfirmationMessage('ご登録ありがとうございます。公開のときに、ご登録のメールアドレスへお知らせをお送りします。');
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);

  // メールアドレス（必須）
  var email = form.addTextItem().setTitle('メールアドレス').setRequired(true);
  email.setValidation(FormApp.createTextValidation().requireTextIsEmail().setHelpText('メールアドレスの形で入力してください').build());

  // 今の状況
  form.addMultipleChoiceItem()
    .setTitle('今の状況に近いものを選んでください')
    .setChoiceValues([
      '訪問看護で働いている（1年未満）',
      '訪問看護で働いている（1〜3年）',
      '訪問看護で働いている（3年以上）',
      'これから訪問看護に移る予定・検討中',
      '管理者・教育担当として検討している',
      'その他',
    ])
    .setRequired(true);

  // 学びたいジャンル
  form.addCheckboxItem()
    .setTitle('特に学びたいジャンル（いくつでも）')
    .setChoiceValues([
      '医療保険と介護保険の振り分け', '加算・算定', '介護保険のしくみ',
      '初回訪問とアセスメント', '疾患別のケア', '医療処置', '急変時の判断と報告', '緩和ケアと看取り',
      '書類と記録', '多職種連携', '家族支援とコミュニケーション', 'リスク管理', '1日の流れとオンコール',
      '小児訪問看護', '精神科訪問看護',
    ]);

  // 自由記述
  form.addParagraphTextItem().setTitle('いま困っていること・知りたいこと（任意）');

  // 回答をためるスプレッドシート
  var ss = SpreadsheetApp.create('訪看スタディ 先行案内の回答');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('回答用URL（LPのWAITLIST_URLに入れる）: ' + form.getPublishedUrl());
  Logger.log('フォームの編集URL: ' + form.getEditUrl());
  Logger.log('回答のスプレッドシート: ' + ss.getUrl());
}

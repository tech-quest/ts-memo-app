USE app;

CREATE TABLE IF NOT EXISTS memos (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO memos (title, content) VALUES ('TypeScriptの学習', 'TypeScriptの学習をする\n- 変数\n- 配列\n- 関数\n etc...');
INSERT INTO memos (title, content) VALUES ('TypeScriptの復習', 'TypeScriptの復習をする\n- 変数\n- 配列\n- 関数\n etc...');
INSERT INTO memos (title, content) VALUES ('フレームワークの学習', 'フレームワークの学習をする\n- 変数\n- 配列\n- 関数\n etc...');

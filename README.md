# README
# chat-space

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

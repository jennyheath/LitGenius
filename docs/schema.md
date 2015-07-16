# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## papers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
title           | string    | not null
user_id         | integer   | not null, foreign key
body            | text      | not null
institution_id  | string    | 
journal_id      | string    |
field_id        | string    |


## annotations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (author of annotation)
paper_id    | integer   | not null, foreign key
body        | text      | not null
start_index | integer   | not null (start of annotation)
end_index   | integer   | not null (end of annotation)
up_votes    | integer   |
down_votes  | integer   |

## comments
(polymorphic)

column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
author_id        | integer   | not null, foreign key (author of comment)
body             | text      | 
commentable_id   | integer   | not null
commentable_type | string    | not null

## votes
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null
comment_id    | integer   | not null
value         | integer   | not null

## fields
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## institutions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## journals
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## authors
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## author_taggings

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
paper_id        | integer   | not null, foreign key
author_id       | integer   | not null, foreign key
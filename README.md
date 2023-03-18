## jconj 接口对照表
jconj 根据更细的单词类型来进行不同的转换，比如「一段动词」「五段动词 -nu结尾」「五段动词 -ru结尾」等。

它根据不同的 pos 值来进行不同的转换，pos 值的对照表如下：

| POS值 | 接口   | 说明                               |
|-------|--------|------------------------------------|
| *28   | v1     | 一段动词                           |
| 29    | ？？ | 一段动词 くれる特殊类            |
| 30    | ？？   | 五段动词 -aru特殊类                   |
| *31   | v5     | 五段动词 -bu结尾                  |
| *32   | v5     | 五段动词 -gu结尾                  |
| *33   | v5     | 五段动词 -ku结尾                  |
| 34    | ？？   | 五段动词 -iku/yuku特殊类           |
| *35   | v5     | 五段动词 -mu结尾                  |
| *36   | v5     | 五段动词 -nu结尾                  |
| *37   | v5     | 五段动词 -ru结尾                  |
| 38   | ？？   | 五段动词 -ru结尾（不规则动词） |
| *39   | v5     | 五段动词 -su结尾                  |
| *40   | v5     | 五段动词 -tsu结尾                |
| *41   | v5     | 五段动词 -u结尾                   |
| 42    | v5     | 五段动词 -u结尾（特殊类）       |
| *45   | kuru   | カ変动词，くる                    |
| *47   | suru   | サ変动词、する                    |

*号表示已经实现的接口类型
## jconj 返回值
|pos | conj | neg | fml
|-------|--------|-------|--------|
|37 | 6 | true | true|

pos: Part-of-speech number

conj: The conjugation number (an id field value from conj.id)

neg: A bool, false for affirmative conjugation, true for negative.

fml: A bool, false for plain, true for formal (-masu) form.


## 动词时态查询表
| 时态 | 接口   | 
|-------|--------|
| 基本形 | ,1,false,false |
| ます形 | ,1,false,true |
| ます形 + 过去 | ,2,false,true |
| ます形 + 过去 + 否定 | ,2,true,true |
| ます形 + 敬语意志 | ,9,false,true |
| ない形 (基本形否定式) | ,1,true,false |
| ない形 + 过去 + 否定（基本形否定过去） | ,2,true,false |
| ます形 + 否定 | ,1,true,true |
| 命令形 | ,10,false,false |
| ます形 + 命令 | ,10,false,true |
| 禁止形 | ,10,true,false |
| た形 + 假定 | ,11,false,false |
| た形（基本形过去式） | ,2,false,false |
| て形 | ,3,false,false |
| ば形 | ,4,false,false |
| ば形 + 否定 + 假定 | ,4,true,false |
| 可能形 | ,5,false,false |
| 被动形 | ,6,false,false |
| 使役形 | ,7,false,false |
| 使役被动 | ,8,false,false |
| 意志形 | ,9,false,false |

更详细的参考：https://cobysy.github.io/jconj/
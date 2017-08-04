var used_cards = [],
    deck = [
        new card('Ace', 'Hearts',11), new card('Two', 'Hearts',2),
        new card('Three', 'Hearts',3), new card('Four', 'Hearts',4),
        new card('Five', 'Hearts',5), new card('Six', 'Hearts',6),
        new card('Seven', 'Hearts',7), new card('Eight', 'Hearts',8),
        new card('Nine', 'Hearts',9), new card('Ten', 'Hearts',10),
        new card('Jack', 'Hearts',10), new card('Queen', 'Hearts',10),
        new card('King', 'Hearts',10), new card('Ace', 'Diamonds',11),
        new card('Two', 'Diamonds',2), new card('Three', 'Diamonds',3),
        new card('Four', 'Diamonds',4), new card('Five', 'Diamonds',5),
        new card('Six', 'Diamonds',6), new card('Seven', 'Diamonds',7),
        new card('Eight', 'Diamonds',8), new card('Nine', 'Diamonds',9),
        new card('Ten', 'Diamonds',10), new card('Jack', 'Diamonds',10),
        new card('Queen', 'Diamonds',10), new card('King', 'Diamonds',10),
        new card('Ace', 'Clubs',11), new card('Two', 'Clubs',2),
        new card('Three', 'Clubs',3), new card('Four', 'Clubs',4),
        new card('Five', 'Clubs',5), new card('Six', 'Clubs',6),
        new card('Seven', 'Clubs',7), new card('Eight', 'Clubs',8),
        new card('Nine', 'Clubs',9), new card('Ten', 'Clubs',10),
        new card('Jack', 'Clubs',10), new card('Queen', 'Clubs',10),
        new card('King', 'Clubs',10), new card('Ace', 'Spades',11),
        new card('Two', 'Spades',2), new card('Three', 'Spades',3),
        new card('Four', 'Spades',4), new card('Five', 'Spades',5),
        new card('Six', 'Spades',6), new card('Seven', 'Spades',7),
        new card('Eight', 'Spades',8), new card('Nine', 'Spades',9),
        new card('Ten', 'Spades',10), new card('Jack', 'Spades',10),
        new card('Queen', 'Spades',10), new card('King', 'Spades',10)
    ],
    hand = {
        cards : [],
        current_total : 0,
        sumCardTotal: function(){
            this.current_total = 0;
            // console.log(this.cards);
            for(var i=0;i<this.cards.length;i++){
                this.current_total += this.cards[i].value;
            }
            $("#hdrTotal").html("Total: " + this.current_total );

            if(this.current_total > 21){
                $("#btnStick").trigger("click");
                $("#imgResult").attr('src','../../codeexample/ch06/end/images/x2.png');
                $("#hdrResult").html("BUST!").attr('class', 'lose');
                // console.log($('#hdrResult').text());
            }else if(this.current_total <= 21 && this.cards.length == 5){
                $("#btnStick").trigger("click");
                $("#imgResult").attr('src','../../codeexample/ch06/end/images/check.png');
                $("#hdrResult").html("BlackJack - 5 card trick!").attr('class', 'win');
                // console.log($('#hdrResult').text());
            }else if(this.current_total == 21 && this.cards.length !== 5){
                $("#btnStick").trigger("click");
                $("#imgResult").attr('src','../../codeexample/ch06/end/images/check.png');
                $("#hdrResult").html("BlackJack!").attr('class', 'win');
                // console.log($('#hdrResult').text());
            }else{ }
        }
    };
$(document).ready(function(){
    // 游戏开始按钮
    $("#btnDeal").click( function(){
        // 发两次牌
        for(var i=0;i<2;i++){
            // console.log(i);
            hit();
        }

        // #btnDeal按钮消失，#btnHit,#btnStick出现
        $(this).toggle();
        $("#btnHit").toggle();
        $("#btnStick").toggle();
    });

    // 继续发牌按钮
    $("#btnHit").click( hit );

    // 发牌结束，开始下一轮
    $("#btnStick").click( function(){
        $("#hdrResult").html('Stick!').attr('class', 'win');
        // console.log($('#hdrResult').text());
        $("#result").toggle();

        // #btnHit,#btnStick按钮消失，只留下#btnRestart按钮
        $("#btnHit").toggle();
        $("#btnStick").toggle();
        $("#btnRestart").toggle();
    });

    // 重新开始游戏按钮
    $("#btnRestart").click( function(){
        $("#result").toggle();
        $(this).toggle();

        $("#my_hand").empty();
        $("#hdrResult").html('');
        $("#imgResult").attr('src','../../codeexample/ch06/end/images/check.png');

        used_cards.length = 0;
        hand.cards.length = 0;

        $("#btnDeal").toggle().trigger('click');  // !important
    });
});
function card(name,suit,value) {
    this.name = name;
    this.suit = suit;
    this.value = value;
}
function getRandom(num){
    // 0<=output<num
    return Math.floor(Math.random()*num);
}
// 出一次牌算一次总数
function hit(){

    var index = getRandom(52);
    if( $.inArray(index, used_cards) == -1 ){  // 不在已发过的牌的数组中

        good_card = true;

        var card = deck[ index ];
        // used_cards[used_cards.length] = index;
        // hand.cards[hand.cards.length] = card;
        used_cards.push(index);
        hand.cards.push(card);

        var $d = $("<div>");
        $d.addClass("current_hand").appendTo("#my_hand");
        $("<img>").attr('alt', card.name + ' of ' + card.suit )
                  .attr('title', card.name + ' of ' + card.suit )
                  .attr('src', '../../codeexample/ch06/end/images/cards/' + card.suit + '/' + card.name + '.jpg' )
                  .appendTo($d)
                  .fadeOut('slow')
                  .fadeIn('slow');
    }
    // console.log(used_cards);
    hand.sumCardTotal();
}
var wins = 0


function playCoin(op){
    let coin 
    $('#coin').addClass('coin1-active')
    if(op.id == 'head'){
        coin = 1
        coins = "Head"
        $('#coin2').text(coins)
        $("#coin").removeClass('coin1-active')
    } else {
        coin = 0
        coins = "Tails"
        $('#coin2').text(coins)
        $("#coin").removeClass('coin1-active')
    }
    
    axios.post('api//minigame/coin', {
        coin: coin
    }).then(function (res) {
        data = res.data
        if (data > 0){
            win = "YOU WIN"
            $('#result').text(win)
            wins += 1;
            $('#number').text('Victories: '+ wins)
        } else {
            wins = 0;
            lose = "YOU LOSE"
            $('#result').text(lose)
        }
    })
}
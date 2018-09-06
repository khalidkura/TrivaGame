$(document).ready(function(){
  
    $("#time-remaining").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: 'How many championships did Michael Jordan Win?',
      q2: 'How old was Derrick Rose when he won MVP?',
      q3: 'Who is commonly referred to as the "logo"?',
      q4: 'What is the legnth of an average NBA court?',
    },
    options: {
      q1: ['6', '3', '10', '2'],
      q2: ['22', '19', '25', '28'],
      q3: ['Michael Jordan', 'Larry Bird', 'Jerry West', 'Kobe Bryant'],
      q4: ['20 feet', '1000 feet', '80 feet', '94 feet'],
    },
    answers: {
      q1: '6',
      q2: '22',
      q3: 'Jerry West',
      q4: '94 feet',
    },
   
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();

      $('#results').html('');

      $('#timer').text(trivia.timer);

      $('#start').hide();
  
      $('#time-remaining').show();

      trivia.nextQuestion();
      
    },
    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#questions').text(questionContent);

      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){

        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();

        $('#start').show();
      }
      
    },

    guessChecker : function() {

      var resultId;

      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>CORRECTAMUNDO!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>WOMP WOMP WOMP! The answer is actually '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      trivia.nextQuestion();
       
    }
  
  }
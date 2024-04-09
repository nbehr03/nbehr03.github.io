
addEventListener('load', getQuote);

btn = document.querySelector("#js-new-quote");
btn.addEventListener('click', getQuote);

answerBtn = document.querySelector("#js-tweet");
answerBtn.addEventListener('click', getAnswer);

const answerText = document.querySelector('#js-answer-text');

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

async function getQuote()
{
    //alert('test');

    try
    {
        const response = await fetch(endpoint);

        if (!response.ok) //if response is not okay
        {
            throw Error(response.statusText);
        }

        const json = await response.json();
        // console.log(json['question']);
        // console.log(json['answer']);

        displayQuote(json['question']);
        answer = json['answer'];
        answerText.textContent = '';

    }

    catch (err)
    {
        console.log(err);
        alert('Failed to fetch new quote');
    }

}

function displayQuote(quote)
{
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

function getAnswer()
{
    answerText.textContent = answer;
}

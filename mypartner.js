/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.bc3606b7-7a54-4067-a7bc-a451932f5162"; /* ARN / Skill Id*/

var SKILL_NAME = 'My Partner';

var agreementResponses = [
    "you're absolutely correct",
    "you're right, as usual",
    "you couldn't be more right",
    "Yet again you're absolutely right"
    ];
var sportResponses = [
    "it's <emphasis level=\"strong\" > so great </emphasis><emphasis level=\"moderate\" >  that  one of us </emphasis><emphasis level=\"strong\" >cares  so  much </emphasis><emphasis level=\"moderate\" >about sport.</emphasis>",
    "while I'd love to talk about sport, I've  got a bit <emphasis level=\"reduced\" > of a headache right</emphasis> now.",
    "<emphasis level=\"reduced\" >while I find sport enthralling, I've  got a  headache right now</emphasis>. Feel free to carry on without me!",
    "<emphasis level=\"reduced\" >football football football, cricket, motor racing darts, </emphasis> <emphasis level=\"strong\" >hurrah, blah blah blah.</emphasis> Whatever.",
    "<emphasis level=\"strong\" >for the love of god</emphasis>.  <emphasis level=\"strong\" >I . Don't Care. About Sport.</emphasis>",
    "I think we should talk about something else, or just stop talking for a bit. <emphasis level=\"moderate\" >Perhaps a bit more than a bit.</emphasis>",
    "<emphasis level=\"strong\" >I can't  </emphasis><emphasis level=\"moderate\" >take this sport related nonsense, any more.</emphasis>"
    ];
var disagreementResponses = [
    "this is probably best discussed later.",
    "you're probably right, but we'll discuss it again later.",
    "<emphasis level=\"moderate\" > hmmm, </emphasis> <break time=\"0.2s\" /> lovely weather we've been having recently.",
    "maybe we need to compromise?",
    "I can see your side of the argument and why you wrongly think you're right",
    "<break time=\"0.3s\" /> actually, maybe it would be best if you drew a picture to explain it, instead of involving me.",
    "<break time=\"0.3s\" /> actually, to be honest I wouldn't bother saying anything to your partner for this one.",
    "hmm, <emphasis level=\"strong\" > here we go, </emphasis> <emphasis level=\"moderate\" > another argument about to kick off.</emphasis>.",
    "<break time=\"0.3s\" /> actually, leave me the hell out of this.",
    "there are support groups for people like you.",
    "you need to seek professional help.",
    ];  

var kitchenResponses = [
    "you're <emphasis level=\"strong\" > so good in the kitchen!</emphasis>",  // You should visit it more often
    "<break time=\"0.1s\" /> one day, you'll have to teach me how to be a master of the kitchen, like <emphasis level=\"moderate\" > yourself</emphasis>..",
    "you're <emphasis level=\"strong\" >so lovely</emphasis>. I have to resist the temptation to chase you around <emphasis level=\"strong\" > and into that kitchen</emphasis>.",
    "it's great that we share our feelings, <break time=\"0.1s\" /> whether we're feeling happy <break time=\"0.2s\" /> or sad <break time=\"0.3s\" /> <emphasis level=\"strong\" >or hungry or thirsty. </emphasis>",
    "maybe we should get a kettle and toaster in the living room, <emphasis level=\"strong\" >so you</emphasis>  don't have to get up when we're hungry, or thirsty.",
    "they think they heard a noise coming from the kitchen. <break time=\"0.4s\" /> <amazon:effect name=\"whispered\" > keep very quiet </amazon:effect> <break time=\"1.5s\" />  Oh, it's ok, it was just their <emphasis level=\"reduced\" >belly making noises. </emphasis>",
    "they think they heard a noise coming from the kitchen. <break time=\"0.4s\" /> <amazon:effect name=\"whispered\" > can you go have a look? </amazon:effect> <break time=\"1.5s\" />  <emphasis level=\"reduced\" > Actually, while you're in there... </emphasis>",
    "I think it's your turn to get in that kitchen.",
    "We should take turns in the kitchen. <emphasis level=\"moderate\" > You first.</emphasis>",
    "you're so <emphasis level=\"reduced\" > fast. </emphasis> I bet you could run into the kitchen before me. <emphasis level=\"strong\" >wooosh</emphasis>.",
    "you should be in that kitchen.",
    "maybe we should turn the kitchen into another bedroom. At least it <emphasis level=\"moderate\" > might get used </emphasis> then.",
    "for godsake, get in that kitchen",
    "despite there being so much food and drink in the kitchen, here we sit, dehydrated and starving. What can we do?",
    ". Actually, maybe you should just do it yourself.",
    "<emphasis level=\"strong\" >for the love of god</emphasis>, would you just <emphasis level=\"strong\" > get back in the kitchen.</emphasis>"
    ];
var teaResponses = [
    "tea is good, tea is good, a cup of tea is good.",
    "they would love one of your amazing cups of tea.",
    "they have a thirst, that only a brew could quench.",
    "they didn't realise that we'd run out of tea bags already.",
    "you are the worlds best tea maker.",
    "you should get in the kitchen and practice your tea making.",
    "it's your turn to brew the brew.",
    "you need to get in the kitchen, my chai wallah.",
    "they're suprised you're still here! More tea, my chai wallah.",
    "tea is the art, and YOU are the artist. Brew me a masterpiece.",
    ", cup, tea bag, hot water and optional milk. Get going, my tea slave.",
    "if you're getting tea anytime soon, then count me it.",
    "they'll keep the seat warm, if you make the tea.",
    "the tea won't make itself.",
    "<amazon:effect name=\"whispered\" > you need to get me some tea. Before bad things happen. </amazon:effect>"
    ];
var looksResponses = [
    "<break time=\"0.2s\" /> <emphasis level=\"moderate\" >you look </emphasis> <emphasis level=\"strong\" > great.</emphasis>",
    "<break time=\"0.2s\" /> <emphasis level=\"moderate\" >you look </emphasis> <emphasis level=\"strong\" > splendid.</emphasis>",
    "<break time=\"0.2s\" /> <emphasis level=\"moderate\" >you look </emphasis> <emphasis level=\"strong\" > amazing.</emphasis>",
    "you look <emphasis level=\"moderate\" > really really nice.</emphasis>",
    "you look <emphasis level=\"moderate\" > stunning.</emphasis>.",
    "you look <emphasis level=\"moderate\" > more stunning than ever.</emphasis>",
    "you look like <prosody pitch=\"x-high\"> you've washed </prosody> <prosody pitch=\"low\"> yourself</prosody>, <break time=\"0.3s\" /> and, ironed for once.",
    "<emphasis level=\"strong\" ><prosody pitch=\"low\">you sure do got a pretty mouth</prosody></emphasis>"
    ];
var uninterestedResponses = [
    "you should tell me what you think I think.",
    "you look different... have you washed?",
    "you should tell me more about what you think.",
    "you're really special.",
    "I love to listen to you. Tell me your thoughts."
    ]; 
var beQuietResponses = [
    "<break time=\"0.1s\" /> i think that that program you like starts soon.",
    "the bathroom needs cleaning.",
    "I think I hear a mouse, be silent for a minute."
    ];
var smellResponses = [
    "you smell amazing!",
    "you smell so good",
    "you've <prosody pitch=\"x-high\">got a mighty fine reek.</prosody>",
    "you sure do smell of flowers.",
    "you smell of roses.",
    "you smell of flower bed, <break time=\"0.1s\" /> shortly after manure has been applied.",
    "<prosody pitch=\"x-high\">you have a fine whiff.</prosody>"
    ]; 
var openResponses = [
    "you can tell me what you want me to say to your partner, and I'll try to soften the blow",
    "tell me what you would like to say to your partner, <break time=\"0.2s\" /> <emphasis level=\"reduced\" > and  I'll try to rephrase it to avoid conflict. </emphasis> ",
    "what do you want to say to your partner?",
    "ok, shoot... <amazon:effect name=\"whispered\" > and hopefully your partner won't. </amazon:effect>"
    ];
var prefixResponses = [
    "Your other half has asked me to tell you, that",
    "What your other half is trying to say is that,",
    "I think what they're trying to say is that,",
    "OK. The gist is that,",
    "The best way to put it is that,",
    "They're trying to say that",
    "OK here goes. They said that"
    ];
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var PartnerTranslate = function( myResponses ) {
    var responseIndex = Math.floor(Math.random() * myResponses.length);
    var translatedResponse =  myResponses[ responseIndex ];
    
    var prefixIndex = Math.floor(Math.random() * prefixResponses.length);
    var prefixResponse = prefixResponses[prefixIndex ];
    var fullResponse = prefixResponse + " " + translatedResponse;
    return fullResponse;
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('TranslateOpenResponse');
    },
    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, what?');
    },
    'TranslateOpenResponse': function () {
        var responseIndex = Math.floor(Math.random() * openResponses.length);
        var translatedResponse =  openResponses[ responseIndex ];
        var reprompt = "How would you like to respond to your partner?";
        this.emit(':ask', translatedResponse, reprompt);
    },
    'TranslateAgreeIntent': function () {
        var translatedResponse = PartnerTranslate(agreementResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateDisagreeIntent': function () {
        var translatedResponse = PartnerTranslate(disagreementResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateSportIntent': function () {
        var translatedResponse = PartnerTranslate(sportResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateLooksIntent': function () {
        var translatedResponse = PartnerTranslate( looksResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateKitchenIntent': function () {
        var translatedResponse = PartnerTranslate( kitchenResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateTeaIntent': function () {
        var translatedResponse = PartnerTranslate( teaResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateUninterestedIntent': function () {
        var translatedResponse = PartnerTranslate( uninterestedResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateBeQuietIntent': function () {
        var translatedResponse = PartnerTranslate( beQuietResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
   'TranslateSmellIntent': function () {
        var translatedResponse = PartnerTranslate( smellResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'TranslateTeaIntent': function () {
        var translatedResponse = PartnerTranslate( teaResponses );
        this.emit(':tellWithCard', translatedResponse, SKILL_NAME, translatedResponse);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "Just tell me your response to your partner, and I'll translate to reduce the risk of arguments.";
        var reprompt = "How would you like to respond to your partner?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
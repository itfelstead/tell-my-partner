'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; /* PUT YOUR ARN HERE */
var SKILL_NAME = 'My Partner';

var agreementResponses = [
    "you're absolutely correct",
    "you're right, as usual",
    "you couldn't be more right",
    "Yet again you're absolutely right"
    ];
var sportResponses = [
    "it's so great that one of us cares so much about sport.",
    "while I'd love to talk about sport, I've got a bit of a headache right now.",
    "football, football, football, cricket, motor racing, hurrah, blah, blah, whatever."
    ];
var disagreementResponses = [
    "this is probably best discussed later.",
    "you're probably right, but we'll discuss it again later.",
    "... hang on did you see that? By the way what do you want for christmas?",
    "maybe we need to compromise?",
    "I can see your side of the argument and why you think you're right",
    "maybe it would be best if you drew a picture to explain it instead of involving me.",
    "to be honest I wouldn't bother saying anything to your partner for this one.",
    "here we go, another argument about to kick off.",
    "you should leave me the hell out of it.",
    "there are support groups for people like you.",
    "you need to seek professional help.",
    ];  
var kitchenResponses = [
    "you're so good in the kitchen!",
    "you'll have to teach me how to be a master of the kitchen like yourself. One day.",
    "you're so lovely. I have to resist the temptation to chase you around the place and into that kitchen.",
    "it's great that we share our feelings, whether we're feeling happy or sad. Or hungary or thirsty.",
    "maybe we should get a kettle and maybe a toaster in the living room so you don't have to get up when we're hungary or thirsty."
    ];
var looksResponses = [
    "you look great.",
    "you look splendid.",
    "you look amazing.",
    "you look really really nice.",
    "you look stunning."
    ];
var uninterestedResponses = [
    "you should tell me what you think I think.",
    "you look different... have you washed?",
    "you should tell me more about what you think.",
    "you're really special.",
    "I love to listen to you. Tell me your thoughts."
    ]; 
var beQuietResponses = [
    "i think that program you like starts soon.",
    "the bathroom needs cleaning.",
    "I think I hear a mouse, be silent for a minute."
    ];
var smellResponses = [
    "you smell amazing!",
    "you smell so good"
    ]; 
var openResponses = [
    "you can tell me what you want me to say to your partner and I'll try to soften the blow",
    "tell me what you would like to say to your partner, and I'll try to rephrase it to avoid conflict."
    ];
var prefixResponses = [
    "Your other half has asked me to tell you that",
    "What your other half is trying to say is that",
    "I think they're trying to say is that",
    "OK. The gist is that",
    "The best way to put it is that",
    "They're trying to say that",
    "OK here goes. They said that"
    ];
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var PartnerTranslate = function( myResponses ) {
    var responseIndex = Math.floor(Math.random() * myResponses.length);
    var translatedResponse =  myResponses[ responseIndex ];
    
    var prefixIndex = Math.floor(Math.random() * prefixResponses.length);
    var prefixResponse = prefixResponses[prefixIndex ];

    return prefixResponse + " " + translatedResponse;
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('TranslateOpenResponse');
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

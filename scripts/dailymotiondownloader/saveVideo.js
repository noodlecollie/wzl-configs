// Steps:
// - Add "embed" into the DailyMotion URL so that it reads https://www.dailymotion.com/embed/video/...
//   (where the "..." is the video URL code).
// - Paste the entire contents of this file into the Javascript console in the browser.
// - Download the video from the page you're taken to.

// What the following code does (taken from the SaveVideo.me and checked by me) is
// to construct a web form on the embed page in order to communicate info about the
// video to SaveVideo.me. The site needs the URL to the embed page and (weirdly) the
// entire HTML body contents (which is encoded as base64). I dunno why they couldn't
// have fetched this information themselves when someone gives them the link...

function saveVideo()
{
    var base64 =
    {
        key_string: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        encode: function (input)
        {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0; input = base64.utf8_encode(input);

            while (i < input.length)
            {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2))
                {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3))
                {
                    enc4 = 64;
                }

                output = output +
                    this.key_string.charAt(enc1) +
                    this.key_string.charAt(enc2) +
                    this.key_string.charAt(enc3) +
                    this.key_string.charAt(enc4);
            }

            return output;
        },

        decode: function (input)
        {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length)
            {
                enc1 = this.key_string.indexOf(input.charAt(i++));
                enc2 = this.key_string.indexOf(input.charAt(i++));
                enc3 = this.key_string.indexOf(input.charAt(i++));
                enc4 = this.key_string.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64)
                {
                    output = output + String.fromCharCode(chr2);
                }

                if (enc4 != 64)
                {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = base64.utf8_decode(output); return output;
        },

        utf8_encode: function (string)
        {
            string = string.replace(/\r\n/g, "\n");
            var utf_string = "";

            for (var n = 0; n < string.length; n++)
            {
                var c = string.charCodeAt(n);
                if (c < 128)
                {
                    utf_string += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048))
                {
                    utf_string += String.fromCharCode((c >> 6) | 192);
                    utf_string += String.fromCharCode((c & 63) | 128);
                }
                else
                {
                    utf_string += String.fromCharCode((c >> 12) | 224);
                    utf_string += String.fromCharCode(((c >> 6) & 63) | 128);
                    utf_string += String.fromCharCode((c & 63) | 128);
                }
            }

            return utf_string;
        },

        utf8_decode: function (utf_string)
        {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utf_string.length)
            {
                c = utf_string.charCodeAt(i);
                if (c < 128)
                {
                    string += String.fromCharCode(c); i++;
                }
                else if ((c > 191) && (c < 224))
                {
                    c2 = utf_string.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else
                {
                    c2 = utf_string.charCodeAt(i + 1);
                    c3 = utf_string.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }

            return string;
        }
    };

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", 'https://savevideo.me/');

    var hidden_field_1 = document.createElement("input");
    hidden_field_1.setAttribute("type", "hidden");
    hidden_field_1.setAttribute("name", "url");
    hidden_field_1.setAttribute("value", document.location);
    form.appendChild(hidden_field_1);

    var hidden_field_2 = document.createElement("input");
    hidden_field_2.setAttribute("type", "hidden");
    hidden_field_2.setAttribute("name", "src");
    hidden_field_2.setAttribute("value", base64.encode(document.body.innerHTML));
    form.appendChild(hidden_field_2);

    document.body.appendChild(form);
    form.submit();
}

saveVideo()

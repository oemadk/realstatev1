! function(a, b, c, d) {
    "use strict";
    var e = "prettyCheckable",
        f = "plugin_" + e,
        g = {
            label: "",
            labelPosition: "right",
            customClass: "",
            color: "blue"
        }, h = function(c) {
            b.ko && a(c).on("change", function(b) {
                if (b.preventDefault(), b.originalEvent === d) {
                    var c = a(this).closest(".clearfix"),
                        e = a(c).find("a:first"),
                        f = e.hasClass("checked");
                    f === !0 ? e.addClass("checked") : e.removeClass("checked")
                }
            }), c.find("a:first, label").on("touchstart click", function(c) {
                c.preventDefault();
                var d = a(this).closest(".clearfix"),
                    e = d.find("input"),
                    f = d.find("a:first");
                f.hasClass("disabled") !== !0 && ("radio" === e.prop("type") && a('input[name="' + e.attr("name") + '"]').each(function(b, c) {
                    a(c).prop("checked", !1).parent().find("a:first").removeClass("checked")
                }), b.ko ? ko.utils.triggerEvent(e[0], "click") : e.prop("checked") ? e.prop("checked", !1).change() : e.prop("checked", !0).change(), f.toggleClass("checked"))
            }), c.find("a:first").on("keyup", function(b) {
                32 === b.keyCode && a(this).click()
            })
        }, i = function(b) {
            this.element = b, this.options = a.extend({}, g)
        };
    i.prototype = {
        init: function(b) {
            a.extend(this.options, b);
            var c = a(this.element);
            c.parent().addClass("has-pretty-child"), c.css("display", "none");
            var e = c.data("type") !== d ? c.data("type") : c.attr("type"),
                f = null,
                g = c.attr("id");
            if (g !== d) {
                var i = a("label[for=" + g + "]");
                i.length > 0 && (f = i.text(), i.remove())
            }
            "" === this.options.label && (this.options.label = f), f = c.data("label") !== d ? c.data("label") : this.options.label;
            var j = c.data("labelposition") !== d ? "label" + c.data("labelposition") : "label" + this.options.labelPosition,
                k = c.data("customclass") !== d ? c.data("customclass") : this.options.customClass,
                l = c.data("color") !== d ? c.data("color") : this.options.color,
                m = c.prop("disabled") === !0 ? "disabled" : "",
                n = ["pretty" + e, j, k, l].join(" ");
            c.wrap('<div class="clearfix ' + n + '"></div>').parent().html();
            var o = [],
                p = c.prop("checked") ? "checked" : "";
            "labelright" === j ? (o.push('<a href="#" class="' + p + " " + m + '"></a>'), o.push('<label for="' + c.attr("id") + '">' + f + "</label>")) : (o.push('<label for="' + c.attr("id") + '">' + f + "</label>"), o.push('<a href="#" class="' + p + " " + m + '"></a>')), c.parent().append(o.join("\n")), h(c.parent())
        },
        check: function() {
            "radio" === a(this.element).prop("type") && a('input[name="' + a(this.element).attr("name") + '"]').each(function(b, c) {
                a(c).prop("checked", !1).attr("checked", !1).parent().find("a:first").removeClass("checked")
            }), a(this.element).prop("checked", !0).attr("checked", !0).parent().find("a:first").addClass("checked")
        },
        uncheck: function() {
            a(this.element).prop("checked", !1).attr("checked", !1).parent().find("a:first").removeClass("checked")
        },
        enable: function() {
            a(this.element).removeAttr("disabled").parent().find("a:first").removeClass("disabled")
        },
        disable: function() {
            a(this.element).attr("disabled", "disabled").parent().find("a:first").addClass("disabled")
        },
        destroy: function() {
            var b = a(this.element),
                c = b.clone(),
                e = b.attr("id");
            if (e !== d) {
                var f = a("label[for=" + e + "]");
                f.length > 0 && f.insertBefore(b.parent())
            }
            c.removeAttr("style").insertAfter(f), b.parent().remove()
        }
    }, a.fn[e] = function(b) {
        var c, d;
        if (this.data(f) instanceof i || this.data(f, new i(this)), d = this.data(f), d.element = this, "undefined" == typeof b || "object" == typeof b) "function" == typeof d.init && d.init(b);
        else {
            if ("string" == typeof b && "function" == typeof d[b]) return c = Array.prototype.slice.call(arguments, 1), d[b].apply(d, c);
            a.error("Method " + b + " does not exist on jQuery." + e)
        }
    }
}(jQuery, window, document);

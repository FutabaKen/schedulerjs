/* global Hogan */
var schedulerjsTemplates = (function() {
  
var t = {
  /* jshint ignore:start */
  'layout' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"sjs-wrapper\">\r");t.b("\n" + i);t.b("    <div class=\"sjs-name-col\">\r");t.b("\n" + i);t.b("        <div class=\"sjs-name-head\"></div>\r");t.b("\n" + i);if(t.s(t.f("names",c,p,1),c,p,0,120,180,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <div class=\"sjs-name\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>\r");t.b("\n" + i);});c.pop();}t.b("    </div>\r");t.b("\n" + i);t.b("    <div class=\"sjs-app-col\">\r");t.b("\n" + i);t.b("        <div class=\"sjs-grid\">\r");t.b("\n" + i);t.b("            <div class=\"sjs-grid-row-head\">\r");t.b("\n" + i);if(t.s(t.f("grid-cols-head",c,p,1),c,p,0,347,507,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                    <div class=\"sjs-grid-col-head\" style=\"width:");t.b(t.v(t.f("width",c,p,0)));t.b("px;\">\r");t.b("\n" + i);t.b("                        ");t.b(t.v(t.f("time",c,p,0)));t.b("\r");t.b("\n" + i);t.b("                    </div>\r");t.b("\n" + i);});c.pop();}t.b("            </div>\r");t.b("\n" + i);if(t.s(t.f("grid-rows",c,p,1),c,p,0,574,813,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <div class=\"sjs-grid-row\">\r");t.b("\n" + i);if(t.s(t.f("grid-cols",c,p,1),c,p,0,654,761,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                        <div class=\"sjs-grid-col\" style=\"width:");t.b(t.v(t.f("width",c,p,0)));t.b("px;\"></div>\r");t.b("\n" + i);});c.pop();}t.b("                </div>\r");t.b("\n" + i);});c.pop();}t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"sjs-grid-overlay\">\r");t.b("\n" + i);t.b("            <div class=\"sjs-grid-overlay-row-head\"></div>\r");t.b("\n" + i);if(t.s(t.f("grid-overlay-rows",c,p,1),c,p,0,978,1563,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <div class=\"sjs-grid-overlay-row\">\r");t.b("\n" + i);if(t.s(t.f("grid-overlay-cols",c,p,1),c,p,0,1074,1503,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                        <div class=\"sjs-grid-overlay-col ");t.b(t.v(t.f("class",c,p,0)));t.b("\" style=\"width:");t.b(t.v(t.f("width",c,p,0)));t.b("px;margin-left:");t.b(t.v(t.f("margin",c,p,0)));t.b("px;\" title=\"");t.b(t.v(t.f("title",c,p,0)));t.b(" ");t.b(t.v(t.f("start",c,p,0)));t.b("-");t.b(t.v(t.f("end",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("                            <span class=\"sjs-grid-overlay-col-title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("                            <br />\r");t.b("\n" + i);t.b("                            <span class=\"sjs-grid-overlay-col-time\">");t.b(t.v(t.f("start",c,p,0)));t.b("-");t.b(t.v(t.f("end",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("                        </div>\r");t.b("\n" + i);});c.pop();}t.b("                </div>\r");t.b("\n" + i);});c.pop();}t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"sjs-fill-height\"></div>\r");t.b("\n" + i);t.b("        <div class=\"sjs-selector\">\r");t.b("\n" + i);t.b("            <div class=\"sjs-selector-edge sjs-selector-left\"></div>\r");t.b("\n" + i);t.b("            <div class=\"sjs-selector-edge sjs-selector-right\"></div>\r");t.b("\n" + i);t.b("            <div class=\"sjs-selector-inner\">\r");t.b("\n" + i);t.b("                <div class=\"sjs-selector-text\">Start</div>\r");t.b("\n" + i);t.b("            </div>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }})
  /* jshint ignore:end */
},
r = function(n) {
  var tn = t[n];
  return function(c, p, i) {
    return tn.render(c, p || t, i);
  };
};
return {
  'layout' : r('layout')
};
})();
;(function($, window, document, undefined){
    function Scheduler(element, options){
        this.element = element;
        this.opts = $.extend({}, Scheduler.defaults, options);

        /** Smallest time step in minutes */
        this.minMinutes = 0;

        /** Largest time step in minutes */
        this.maxMinutes = 1440;

        /** Selected start time in page offset pixels */
        this.selectedStart = 0;

        /** Selected time length in pixels */
        this.selectedWidth = 0;

        /** List of time steps given in minutes */
        this.stepsMinutes = [];

        /** List of names with appointments */
        this.nameList = [];

        this.createView();
        this.setListeners();

        this.selectedStart = this.minMinutes + 60;
        this.selectedWidth = 60;

        if(this.opts.start !== undefined){
            this.selectedStart = this.timeStrToPageOffset(this.opts.start);
        }
        if(this.opts.end !== undefined){
            this.selectedWidth = this.timeStrToPageOffset(this.opts.end) - this.selectedStart;
        }

        this.updateSelector();
    }

    Scheduler.defaults = {
        'pixelsPerHour': 200,
        'snapTo': 5,
        'steps': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        'list': []
    };

    Scheduler.prototype.public = {
        "selected": function(){
            return {
                'start': this.pageOffsetToTimeStr(this.selectedStart),
                'end': this.pageOffsetToTimeStr(this.selectedStart + this.selectedWidth)
            }
        },
        "start": function(startTime){
            if(startTime !== undefined){
                this.selectedStart = this.timeStrToPageOffset(startTime);
                this.updateSelector();
            }

            return this.pageOffsetToTimeStr(this.selectedStart);
        },
        "end": function(endTime){
            if(endTime !== undefined){
                this.selectedWidth = this.timeStrToPageOffset(endTime) - this.selectedStart;
                this.updateSelector();
            }

            return this.pageOffsetToTimeStr(this.selectedStart + this.selectedWidth);
        },
        "update": function(list){
            this.nameList = [];
            this.opts.list = list;
            this.createView();
        }
    };

    Scheduler.prototype.setListeners = function(){
        var that = this;

        var $selector = null;
        var $edgeLeft = null;
        var $edgeRight = null;
        var offset = null;

        this.element.on("mousemove", function(e) {
            var newStart, newEnd;
            if($selector){
                newStart = e.pageX - offset;
                that.moveSelector(newStart - that.selectedStart);
                that.updateSelector();
            }else if($edgeLeft){
                newStart = e.pageX - offset;
                that.resizeSelectorLeft(newStart - that.selectedStart);
                that.updateSelector();
            }else if($edgeRight){
                newEnd = e.pageX - offset;
                that.resizeSelectorRight(newEnd - (that.selectedStart+that.selectedWidth));
                that.updateSelector();
            }
        });


        this.element.on("mousedown", ".sjs-selector", function (e) {
            e.stopPropagation();
            $selector =  $(this);
            $edgeLeft = null;
            $edgeRight = null;
            offset = e.offsetX;
        });

        this.element.on('mousedown', '.sjs-selector-left', function(e){
            e.stopPropagation();
            $selector = null;
            $edgeLeft = $(this);
            $edgeRight = null;
            offset = e.offsetX;
        });

        this.element.on('mousedown', '.sjs-selector-right', function(e){
            e.stopPropagation();
            $selector = null;
            $edgeLeft = null;
            $edgeRight = $(this);
            offset = e.offsetX - $edgeRight.width();
        });

        this.element.on("mouseup", function (e){
            if($selector || $edgeLeft || $edgeRight){
                that.snapSelector();
                $selector = null;
                $edgeLeft = null;
                $edgeRight = null;
            }
        });
        this.element.on("mouseleave", function(e){
            if($selector || $edgeLeft || $edgeRight){
                that.snapSelector();
                $selector = null;
                $edgeLeft = null;
                $edgeRight = null;
            }
        });

        this.element.on('click', '.sjs-grid-overlay-col', function(e){
            var payload = $(this).data('payload');
            console.log(payload);
        });
    };

    Scheduler.prototype.updateSelector = function(){
        var $selector = this.element.find('.sjs-selector');
        $selector.offset({
           left: this.selectedStart
        });
        $selector.width(this.selectedWidth);

        $selector.find('.sjs-selector-text').html(
            this.pageOffsetToTimeStr(this.selectedStart) +
            ' - ' +
            this.pageOffsetToTimeStr(this.selectedStart+this.selectedWidth)
        );
    };

    Scheduler.prototype.snapSelector = function(){
        var startMinutes = this.pageOffsetToMinutes(this.selectedStart);
        var endMinutes = this.pageOffsetToMinutes(this.selectedStart + this.selectedWidth);

        var startSnapOffset = startMinutes%this.opts.snapTo;
        var endSnapOffset = endMinutes%this.opts.snapTo;

        startSnapOffset > this.opts.snapTo/2 ?
            startMinutes += this.opts.snapTo - startSnapOffset :
            startMinutes -= startSnapOffset;

        endSnapOffset > this.opts.snapTo/2 ?
            endMinutes += this.opts.snapTo - endSnapOffset :
            endMinutes -= endSnapOffset;

        this.selectedStart = this.minutesToPageOffset(startMinutes);
        this.selectedWidth = this.minutesToPageOffset(endMinutes) - this.selectedStart;
        this.updateSelector();
    };

    Scheduler.prototype.resizeSelectorLeft = function(deltaPixels){
        var targetStart = this.selectedStart + deltaPixels;
        var targetWidth = this.selectedWidth - deltaPixels;
        var targetStartMinutes = this.pageOffsetToMinutes(targetStart);
        var targetWidthMinutes = this.pixelsToMinutes(targetWidth);

        if(targetStartMinutes < this.minMinutes){
            targetWidthMinutes -= this.minMinutes - targetStartMinutes;
            targetStartMinutes = this.minMinutes;
        }
        if(targetWidthMinutes < this.opts.snapTo){
            targetWidthMinutes = this.opts.snapTo;
        }

        this.selectedStart = this.minutesToPageOffset(targetStartMinutes);
        this.selectedWidth = this.minutesToPixels(targetWidthMinutes);
    };
    Scheduler.prototype.resizeSelectorRight = function(deltaPixels){
        var targetWidth = this.selectedWidth + deltaPixels;
        var targetStartMinutes = this.pageOffsetToMinutes(this.selectedStart);
        var targetWidthMinutes = this.pixelsToMinutes(targetWidth);

        if(targetStartMinutes + targetWidthMinutes > this.maxMinutes){
            targetWidthMinutes = this.maxMinutes - targetStartMinutes;
        }
        if(targetWidthMinutes < this.opts.snapTo){
            targetWidthMinutes = this.opts.snapTo;
        }

        this.selectedWidth = this.minutesToPixels(targetWidthMinutes);
    };
    Scheduler.prototype.moveSelector = function(deltaPixels){
        var targetStart = this.selectedStart + deltaPixels;
        var targetStartMinutes = this.pageOffsetToMinutes(targetStart);
        var targetWidthMinutes = this.pixelsToMinutes(this.selectedWidth);

        if(targetStartMinutes < this.minMinutes){
            targetStartMinutes = this.minMinutes;
        }
        if(targetStartMinutes + targetWidthMinutes > this.maxMinutes){
            targetStartMinutes = this.maxMinutes - targetWidthMinutes;
        }

        this.selectedStart = this.minutesToPageOffset(targetStartMinutes);
    };

    Scheduler.prototype.pageOffsetToTimeStr = function(pageOffset){
        return this.minutesToTimeStr(this.pageOffsetToMinutes(pageOffset));
    };
    Scheduler.prototype.timeStrToPageOffset = function(timeStr){
        return this.minutesToPageOffset(this.timeStrToMinutes(timeStr));
    };
    Scheduler.prototype.pageOffsetToMinutes = function(pageOffset){
        return this.pixelsToMinutes(pageOffset - this.getGridOffset()) + this.minMinutes;
    };
    Scheduler.prototype.minutesToPageOffset = function(minutes){
        return this.minutesToPixels(minutes - this.minMinutes) + this.getGridOffset();
    };
    Scheduler.prototype.getGridOffset = function(){
        return this.element.find('.sjs-grid').first().offset().left;
    };
    Scheduler.prototype.minutesToPixels = function(minutes){
        return Math.round(minutes*this.opts.pixelsPerHour/60);
    };
    Scheduler.prototype.pixelsToMinutes = function(pixels){
        return Math.round(60*pixels/this.opts.pixelsPerHour);
    };
    Scheduler.prototype.timeStrToMinutes = function(str){
        var split = str.split(':');
        return parseInt(split[0]) * 60 + parseInt(split[1]);
    };
    Scheduler.prototype.minutesToTimeStr = function(minutes){
        var hours = Math.floor(minutes/60);
        var minutesInHour = minutes - hours*60;
        var str = '';

        if(hours < 10){
            str = '0' + String(hours);
        }else{
            str = String(hours);
        }

        if(minutesInHour < 10){
            str += ':0' + String(minutesInHour);
        }else{
            str += ':' + String(minutesInHour);
        }

        return str;
    };

    /**
     * Creates the grid overlay row data that will be used when rendering the layout
     */
    Scheduler.prototype.getGridOverlayRowData = function(){
        var gridOverlayRows = [];
        for (var i = 0; i <  this.opts.list.length; i++) {
            var prevEnd = this.minMinutes;

            var gridOverlayCols = [];
            for (var j = 0; j <  this.opts.list[i].appointments.length; j++) {
                var appointment =  this.opts.list[i].appointments[j];

                var minutesStart = this.timeStrToMinutes(appointment.start);
                var minutesEnd = this.timeStrToMinutes(appointment.end);

                if(minutesEnd < minutesStart){
                    continue;
                }

                if(minutesEnd > this.maxMinutes){
                    minutesEnd = this.maxMinutes;
                }

                if(minutesStart < this.minMinutes){
                    minutesStart = this.minMinutes;
                }

                var length = minutesEnd - minutesStart;

                var lengthSinceLast = minutesStart - prevEnd;
                prevEnd = minutesEnd;

                gridOverlayCols.push({
                    'width': this.minutesToPixels(length),
                    'margin': this.minutesToPixels(lengthSinceLast),
                    'class': appointment.class === undefined ? '' : appointment.class,
                    'title': appointment.title,
                    'start': appointment.start,
                    'end': appointment.end
                });
            }

            gridOverlayRows.push({
                'grid-overlay-cols': gridOverlayCols
            });
        }

        return gridOverlayRows;
    };

    Scheduler.prototype.createView = function(){
        this.nameList = this.opts.list.map(function(elem){
            return {name: elem.name};
        });

        this.stepsMinutes = this.opts.steps.map(this.timeStrToMinutes);
        this.minMinutes = Math.min.apply(Math, this.stepsMinutes);
        this.maxMinutes = Math.max.apply(Math, this.stepsMinutes);

        var gridColsHead = [];
        var gridCols = [];
        for (var i = 0; i < this.stepsMinutes.length - 1; i++) {
            var length = this.stepsMinutes[i + 1] - this.stepsMinutes[i];
            gridColsHead.push({'width': this.minutesToPixels(length), 'time': this.opts.steps[i]});
            gridCols.push({'width': this.minutesToPixels(length)});
        }

        var gridRows = [];
        for(i = 0; i < this.opts.list.length; i++){
            gridRows.push({'grid-cols': gridCols});
        }

        this.element.html(schedulerjsTemplates.layout({
            'names': this.nameList,
            'grid-cols-head': gridColsHead,
            'grid-rows': gridRows,
            'grid-overlay-rows': this.getGridOverlayRowData()
        }));

        // Since the grid and grid overlay are absolutely positioned, they
        // don't take up any height. Therefore we find the height of the grid here,
        // and use a dummy div to fill the area with that height
        // Also adding some pixels to accommodate the selectors
        var gridHeight = this.element.find('.sjs-grid').first().height();
        var extraHeightForSelectors = 22; /* Should be big enough to make room for the selector boxes */
        var selectorsMarginTop = 15; /* Should equal the margin-top of the selectors */
        this.element.find('.sjs-fill-height').first().height(gridHeight + extraHeightForSelectors);
        this.element.find('.sjs-selector').height(gridHeight + extraHeightForSelectors - selectorsMarginTop);
    };

    $.fn.schedulerjs = function(opts){
        var args = Array.prototype.slice.call(arguments, 1);
        var retVal;
        var pluginName = 'schedulerjs';

        this.each(function () {
            var plugin;

            if (!$.data(this, pluginName)) {
                if(typeof opts !== 'object'){
                    $.error(pluginName + " needs an options object for initialization.");
                    return;
                }
                $.data(this, pluginName,
                    new Scheduler( $(this), opts ));
            }

            plugin = $.data(this, pluginName);

            if(typeof opts !== 'object') {
                if(plugin.public[opts]){
                    retVal = plugin.public[opts].apply(plugin, args);
                }else{
                    $.error( 'Method ' +  opts + ' does not exist in ' + pluginName );
                }
            }
        });

        if(retVal !== undefined){
            return retVal;
        }

        return this;
    };
})(jQuery, window, document);

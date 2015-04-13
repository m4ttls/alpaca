(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.GPSPoint = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.GPSPoint.prototype
     */
    {
        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function()
        {
            // default html5 input type = "tel";
            this.inputType = "gps";

            this.base();

            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.phone;
            }

            if (Alpaca.isEmpty(this.options.maskString)) {
                this.options.maskString =
                "^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$";

            }

        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.getMessage("invalidGPSPoint");
            }

            return baseStatus;
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "gps point";
        }

        /* builder_helpers */
        ,

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "GPS Point";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "GPS Point.";
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern) ? this.schema.pattern : Alpaca.regexps.gpspoint;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": pattern,
                        "enum":[pattern],
                        "readonly": true
                    },
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"gpspoint",
                        "enum":["gpspoint"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "maskString": {
                        "title": "Field Mask String",
                        "description": "Expression for field mask",
                        "type": "string",
                        "default": "47.1231231, 179.99999999"
                    }
                }
            });
        }

        /* end_builder_helpers */
    });

    Alpaca.registerMessages({
        "invalidGpsPoint": "Invalid GPS Point, e.g. 47.1231231, 179.99999999"
    });
    Alpaca.registerFieldClass("gpspoint", Alpaca.Fields.GPSPoint);
    Alpaca.registerDefaultFormatFieldMapping("gpspoint", "gpspoint");

})(jQuery);

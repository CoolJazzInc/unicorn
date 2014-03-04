
/**
 * Store data on any object.
 */

define(function() {

    'use strict';

    return {
        dictionary: [],

        /**
         * Get the value of an entry in the storage or the entire storage for the element.
         * @param {*} owner The object that owns the data.
         * @param {String} key The entry's key.
         * @return {*} The key's value or the storage.
         */
        get: function(owner, key) {
            var entry = this.getEntry(owner);
            return entry.data && key in entry.data ? entry.data[key] : null;
        },

        /**
         * Create an entry in the storage.
         * @param {*} owner The object that owns the data.
         * @param {String} key The entry's key.
         * @param {*} value The entry's value.
         * @return {*} The entry's value.
         */
        set: function(owner, key, value) {
            var entry = this.getEntry(owner);
            if (!entry.owner || !entry.data) {
                // make new entry in the storage.
                entry.owner = owner;
                entry.data = {};
                entry.data[key] = value;
                this.dictionary.push(entry);
            } else {
                entry.data[key] = value;
            }
            return value;
        },

        /**
         * Remove a key from the storage or the entire entry for the owner.
         * @param {*} owner The object that owns the data.
         * @param {String} key The key to delete.
         */
        remove: function(owner, key) {
            var entry = this.getEntry(owner);
            if (key !== undefined) {
                // remove the key from the element's data.
                if (entry.data) delete entry.data[key];
            } else {
                // remove the element's entry in the storage.
                this.dictionary.splice(this.dictionary.indexOf(entry), 1);
            }
        },

        /**
         * Get the entry for the object in the dictionary.
         * @param {*} owner The object that owns the data.
         * @return {Object} The owner's data.
         */
        getEntry: function(owner) {
            var entries = this.dictionary.filter(function(entry) {
                return entry.owner === owner;
            });

            return entries[0] || {};
        }
    };
});

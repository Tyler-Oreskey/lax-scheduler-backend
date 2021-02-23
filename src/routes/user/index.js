const CommonRoutes = require("../common");

class User extends CommonRoutes {
    constructor() {
        super("users", {
            first_name: String,
            last_name: String,
            email: String,
            is_email_verified: Boolean,
            receive_emails: Boolean
        });
    }
}

module.exports = User;
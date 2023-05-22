const Joi = require("joi");

 const schema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
                    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
}).with("name", "email", "phone");


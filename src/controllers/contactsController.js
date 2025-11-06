const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
  res.render("contacts", { contact: {} });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => res.redirect("/contato/index"));
      return;
    }

    req.flash("success", "Contato criado com sucesso!");
    req.session.save(() =>
      res.redirect(`/contato/index/${contact.contact._id}`)
    );
    return;
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const contact = await Contact.searchId(req.params.id);

  if (!contact) return res.render("404");

  res.render("contacts", { contact });
};

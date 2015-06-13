LitGenius.Views.PaperNew = Backbone.View.extend({
  template: JST['papers/new'],

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var content = this.template({
      paper: this.model
    });

    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();
    this.model.set({body: attrs.paper.body, title: attrs.paper.title});

    // var fieldId = LitGenius.Collections.fields.getOrFetchId(attrs.paper.field);
    // var field_tagging = new LitGenius.Models.FieldTagging();
    // field_tagging.save({paper_id: this.model.id, field_id: fieldId});

    var authors = attrs.paper.authors.split(", ");
    authors.forEach(function (author) {
      var authorId = LitGenius.Collections.authors.getOrFetchId(author);
      var author_tagging = new LitGenius.Models.AuthorTagging();
      author_tagging.save({paper_id: this.model.id, author_id: authorId});
    });

    // var institutionId = LitGenius.Collections.institutions.getOrFetchId(attrs.paper.institution);
    // var institution_tagging = new LitGenius.Models.InstitutionTagging();
    // institution_tagging.save({paper_id: this.model.id, institution_id: institutionId});
    //
    // var journalId = LitGenius.Collections.journals.getOrFetchId(attrs.paper.journal);
    // var journal_tagging = new LitGenius.Models.JournalTagging();
    // journal_tagging.save({paper_id: this.model.id, journal_id: journalId});

    this.model.save({}, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate("", { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this.$el.append(response.responseText);
      }.bind(this)
    });
  }
});

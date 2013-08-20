define(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/sidebar', 'view/base-view', 'view/login-view', 'model/sidebar', 'event/channel', 'cookie'],
	function($, _, Backbone, Resthub, SidebarTmpl, BaseView, LoginView, SidebarModel, channel, Cookie) {
		var SidebarView = BaseView.extend({
			events: {
				//  'keyup #new-todo':     'showTooltip'
			},

			initialize: function(data) {
				_.bindAll(this);
				this.template = SidebarTmpl;
				this.subName = data.subName
				this.model = new SidebarModel(this.subName)

				if (this.subname == "front") {
					this.render()

				} else { //only fetch sidebar info if on the front page
					this.model.fetch({
						success: this.loaded
					});
				}
				// this.$() is a shortcut for this.$el.find().

			},
			loaded: function(response, sidebar) {
				this.render()

				this.loginView = new LoginView({
					root: "#theLogin"
				})

				//now render the login view
				this.loginView.render();
				channel.trigger("header:update", this.model);

				//HeaderView.updateHeader(this.model)

			},

		});
		return SidebarView;
	});
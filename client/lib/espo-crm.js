/*! espocrm 2024-01-05 */
define(
  "crm:views/meeting/fields/attendees",
  ["views/fields/link-multiple-with-role"],
  function (e) {
    return e.extend({
      columnName: "status",
      roleFieldIsForeign: !1,
      emptyRoleValue: "None",
    });
  }
),
  define(
    "crm:views/meeting/fields/contacts",
    ["crm:views/meeting/fields/attendees"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "modules/crm/knowledge-base-helper",
    ["exports", "ajax"],
    function (e, s) {
      "use strict";
      var t;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0),
        (s = (t = s) && t.__esModule ? t : { default: t });
      e.default = class {
        constructor(e) {
          this.language = e;
        }
        getAttributesForEmail(e, t, i) {
          ((t = t || {}).body = e.get("body")),
            t.name ? (t.name = t.name + " ") : (t.name = ""),
            (t.name +=
              this.language.translate("KnowledgeBaseArticle", "scopeNames") +
              ": " +
              e.get("name")),
            s.default
              .postRequest("KnowledgeBaseArticle/action/getCopiedAttachments", {
                id: e.id,
                parentType: "Email",
                field: "attachments",
              })
              .then((e) => {
                (t.attachmentsIds = e.ids),
                  (t.attachmentsNames = e.names),
                  (t.isHtml = !0),
                  i(t);
              });
        }
      };
    }
  ),
  define("crm:views/task/record/list", ["views/record/list"], function (e) {
    return e.extend({
      rowActionsView: "crm:views/task/record/row-actions/default",
      actionSetCompleted: function (e) {
        var e = e.id;
        !e ||
          ((e = this.collection.get(e)) &&
            (e.set("status", "Completed"),
            this.listenToOnce(e, "sync", () => {
              Espo.Ui.notify(!1), this.collection.fetch();
            }),
            Espo.Ui.notify(this.translate("saving", "messages")),
            e.save()));
      },
    });
  }),
  define(
    "crm:views/record/panels/tasks",
    ["views/record/panels/relationship"],
    function (t) {
      return t.extend({
        name: "tasks",
        entityType: "Task",
        filterList: ["all", "actual", "completed"],
        defaultTab: "actual",
        orderBy: "createdAt",
        orderDirection: "desc",
        rowActionsView: "crm:views/record/row-actions/tasks",
        buttonList: [
          {
            action: "createTask",
            title: "Create Task",
            acl: "create",
            aclScope: "Task",
            html: '<span class="fas fa-plus"></span>',
          },
        ],
        actionList: [{ label: "View List", action: "viewRelatedList" }],
        listLayout: {
          rows: [
            [{ name: "name", link: !0 }],
            [
              { name: "isOverdue" },
              { name: "assignedUser" },
              { name: "dateEnd" },
              { name: "status" },
            ],
          ],
        },
        setup: function () {
          (this.parentScope = this.model.entityType),
            (this.link = "tasks"),
            (this.panelName = "tasksSide"),
            (this.defs.create = !0),
            "Account" === this.parentScope && (this.link = "tasksPrimary"),
            (this.url =
              this.model.entityType + "/" + this.model.id + "/" + this.link),
            this.setupSorting(),
            this.filterList &&
              this.filterList.length &&
              (this.filter = this.getStoredFilter()),
            this.setupFilterActions(),
            this.setupTitle(),
            this.wait(!0),
            this.getCollectionFactory().create("Task", (e) => {
              ((this.collection = e).seeds = this.seeds),
                (e.url = this.url),
                (e.orderBy = this.defaultOrderBy),
                (e.order = this.defaultOrder),
                (e.maxSize = this.getConfig().get("recordsPerPageSmall") || 5),
                this.setFilter(this.filter),
                this.wait(!1);
            }),
            this.once("show", () => {
              this.isRendered() ||
                this.isBeingRendered() ||
                this.collection.fetch();
            });
        },
        afterRender: function () {
          this.createView(
            "list",
            "views/record/list-expanded",
            {
              selector: "> .list-container",
              pagination: !1,
              type: "listRelationship",
              rowActionsView: this.defs.rowActionsView || this.rowActionsView,
              checkboxes: !1,
              collection: this.collection,
              listLayout: this.listLayout,
              skipBuildRows: !0,
            },
            (e) => {
              e.getSelectAttributeList((e) => {
                e && (this.collection.data.select = e.join(",")),
                  this.disabled
                    ? this.once("show", () => this.collection.fetch())
                    : this.collection.fetch();
              });
            }
          );
        },
        actionCreateRelated: function () {
          this.actionCreateTask();
        },
        actionCreateTask: function (e) {
          let t = this.link;
          "Account" === this.parentScope && (t = "tasks");
          var i = "Task",
            s = this.model.defs.links[t].foreign,
            a =
              (Espo.Ui.notify(" ... "),
              this.getMetadata().get("clientDefs.Task.modalViews.edit") ||
                "views/modals/edit");
          this.createView(
            "quickCreate",
            a,
            { scope: i, relate: { model: this.model, link: s } },
            (e) => {
              e.render(),
                e.notify(!1),
                this.listenToOnce(e, "after:save", () => {
                  this.collection.fetch(), this.model.trigger("after:relate");
                });
            }
          );
        },
        actionRefresh: function () {
          this.collection.fetch();
        },
        actionComplete: function (t) {
          t = t.id;
          if (t) {
            let e = this.collection.get(t);
            e.save({ status: "Completed" }, { patch: !0 }).then(() =>
              this.collection.fetch()
            );
          }
        },
        actionViewRelatedList: function (e) {
          (e.viewOptions = e.viewOptions || {}),
            (e.viewOptions.massUnlinkDisabled = !0),
            t.prototype.actionViewRelatedList.call(this, e);
        },
      });
    }
  ),
  define(
    "modules/crm/views/record/panels/activities",
    ["exports", "views/record/panels/relationship", "multi-collection"],
    function (e, t, s) {
      "use strict";
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0),
        (t = i(t)),
        (s = i(s));
      class a extends t.default {
        name = "activities";
        orderBy = "dateStart";
        serviceName = "Activities";
        order = "desc";
        rowActionsView = "crm:views/record/row-actions/activities";
        relatedListFiltersDisabled = !0;
        buttonMaxCount = null;
        actionList = [
          {
            action: "composeEmail",
            label: "Compose Email",
            acl: "create",
            aclScope: "Email",
          },
        ];
        listLayout = {};
        defaultListLayout = {
          rows: [
            [
              { name: "ico", view: "crm:views/fields/ico" },
              {
                name: "name",
                link: !0,
                view: "views/event/fields/name-for-history",
              },
            ],
            [{ name: "assignedUser" }, { name: "dateStart" }],
          ],
        };
        BUTTON_MAX_COUNT = 3;
        setup() {
          (this.scopeList =
            this.getConfig().get(this.name + "EntityList") || []),
            (this.buttonMaxCount = this.getConfig().get(
              "activitiesCreateButtonMaxCount"
            )),
            void 0 === this.buttonMaxCount &&
              (this.buttonMaxCount = this.BUTTON_MAX_COUNT),
            (this.listLayout = Espo.Utils.cloneDeep(this.listLayout)),
            (this.defs.create = !0),
            (this.createAvailabilityHash = {}),
            (this.entityTypeLinkMap = {}),
            (this.createEntityTypeStatusMap = {}),
            this.setupActionList(),
            this.setupFinalActionList(),
            this.setupSorting(),
            this.scopeList.forEach((e) => {
              e in this.listLayout ||
                (this.listLayout[e] = this.defaultListLayout);
            }),
            (this.url =
              this.serviceName +
              "/" +
              this.model.entityType +
              "/" +
              this.model.id +
              "/" +
              this.name),
            (this.seeds = {}),
            this.wait(!0);
          let i = 0;
          this.scopeList.forEach((t) => {
            this.getModelFactory().create(t, (e) => {
              (this.seeds[t] = e),
                ++i === this.scopeList.length && this.wait(!1);
            });
          }),
            0 === this.scopeList.length && this.wait(!1),
            (this.filterList = []),
            this.scopeList.forEach((e) => {
              this.getAcl().check(e) &&
                this.getAcl().check(e, "read") &&
                (this.getMetadata().get(["scopes", e, "disabled"]) ||
                  this.filterList.push(e));
            }),
            this.filterList.length && this.filterList.unshift("all"),
            this.filterList &&
              this.filterList.length &&
              (this.filter = this.getStoredFilter()),
            this.setupFilterActions(),
            this.setupTitle(),
            (this.collection = new s.default()),
            (this.collection.seeds = this.seeds),
            (this.collection.url = this.url),
            (this.collection.orderBy = this.orderBy),
            (this.collection.order = this.order),
            (this.collection.maxSize =
              this.getConfig().get("recordsPerPageSmall") || 5),
            this.setFilter(this.filter),
            this.once("show", () => {
              this.isRendered() ||
                this.isBeingRendered() ||
                this.collection.fetch();
            });
        }
        translateFilter(e) {
          return "all" === e
            ? this.translate(e, "presetFilters")
            : this.translate(e, "scopeNamesPlural");
        }
        isCreateAvailable(e) {
          return this.createAvailabilityHash[e];
        }
        setupActionList() {
          "activities" === this.name &&
            this.buttonMaxCount &&
            this.buttonList.push({
              action: "composeEmail",
              title: "Compose Email",
              acl: "create",
              aclScope: "Email",
              html: $("<span>")
                .addClass(
                  this.getMetadata().get(["clientDefs", "Email", "iconClass"])
                )
                .get(0).outerHTML,
            }),
            this.scopeList.forEach((i) => {
              if (
                this.getMetadata().get([
                  "clientDefs",
                  i,
                  "activityDefs",
                  this.name + "Create",
                ]) &&
                this.getAcl().checkScope(i, "create")
              ) {
                var s =
                  ("history" === this.name ? "Log" : "Schedule") + " " + i;
                let t = {
                  action: "createActivity",
                  text: this.translate(s, "labels", i),
                  data: {},
                  acl: "create",
                  aclScope: i,
                };
                var a = this.getMetadata().get([
                  "clientDefs",
                  i,
                  "activityDefs",
                  "link",
                ]);
                if (a) {
                  if (
                    ((t.data.link = a),
                    (this.entityTypeLinkMap[i] = a),
                    !this.model.hasLink(a))
                  )
                    return;
                } else if (
                  ((t.data.scope = i),
                  "User" !== this.model.entityType &&
                    !this.checkParentTypeAvailability(i, this.model.entityType))
                )
                  return;
                if (
                  ((this.createAvailabilityHash[i] = !0),
                  (t.data = t.data || {}),
                  t.data.status ||
                    ((a = this.getMetadata().get([
                      "scopes",
                      i,
                      this.name + "StatusList",
                    ])) &&
                      a.length &&
                      (t.data.status = a[0])),
                  (this.createEntityTypeStatusMap[i] = t.data.status),
                  this.actionList.push(t),
                  "activities" === this.name &&
                    this.buttonList.length < this.buttonMaxCount)
                ) {
                  let e = Espo.Utils.cloneDeep(t);
                  a = this.getMetadata().get(["clientDefs", i, "iconClass"]);
                  a &&
                    ((e.title = s),
                    (e.html = $("<span>").addClass(a).get(0).outerHTML),
                    this.buttonList.push(e));
                }
              }
            });
        }
        setupFinalActionList() {
          this.scopeList.forEach((e, t) => {
            0 === t && this.actionList.length && this.actionList.push(!1),
              this.getAcl().checkScope(e, "read") &&
                ((t = {
                  action: "viewRelatedList",
                  html: $("<span>")
                    .append(
                      $("<span>").text(this.translate("View List")),
                      " &middot; ",
                      $("<span>").text(this.translate(e, "scopeNamesPlural"))
                    )
                    .get(0).innerHTML,
                  data: { scope: e },
                  acl: "read",
                  aclScope: e,
                }),
                this.actionList.push(t));
          });
        }
        setFilter(e) {
          (this.filter = e),
            (this.collection.data.entityType = null),
            e && "all" !== e && (this.collection.data.entityType = this.filter);
        }
        afterRender() {
          let e = () => {
            this.createView(
              "list",
              "views/record/list-expanded",
              {
                selector: "> .list-container",
                pagination: !1,
                type: "listRelationship",
                rowActionsView: this.rowActionsView,
                checkboxes: !1,
                collection: this.collection,
                listLayout: this.listLayout,
              },
              (e) => {
                e.render(),
                  this.listenTo(e, "after:save", () => {
                    this.fetchActivities(), this.fetchHistory();
                  });
              }
            );
          };
          this.disabled
            ? this.once("show", () => {
                this.collection.fetch().then(() => e());
              })
            : this.collection.fetch().then(() => e());
        }
        fetchHistory() {
          let t = this.getParentView();
          if (t && t.hasView("history")) {
            let e = t.getView("history").collection;
            e && e.fetch();
          }
        }
        fetchActivities() {
          let t = this.getParentView();
          if (t && t.hasView("activities")) {
            let e = t.getView("activities").collection;
            e && e.fetch();
          }
        }
        getCreateActivityAttributes(e, t, i) {
          let s = { status: (t = t || {}).status };
          if ("User" === this.model.entityType) {
            let t = this.model;
            if (t.isPortal()) {
              s.usersIds = [t.id];
              let e = {};
              (e[t.id] = t.get("name")), (s.usersIdsNames = e);
            } else
              (s.assignedUserId = t.id), (s.assignedUserName = t.get("name"));
          } else
            "Contact" === this.model.entityType
              ? this.model.get("accountId") &&
                !this.getConfig().get("b2cMode") &&
                ((s.parentType = "Account"),
                (s.parentId = this.model.get("accountId")),
                (s.parentName = this.model.get("accountName")),
                !e ||
                  this.getMetadata().get([
                    "entityDefs",
                    e,
                    "links",
                    "contacts",
                  ]) ||
                  this.getMetadata().get([
                    "entityDefs",
                    e,
                    "links",
                    "contact",
                  ]) ||
                  (delete s.parentType, delete s.parentId, delete s.parentName))
              : "Lead" === this.model.entityType &&
                ((s.parentType = "Lead"),
                (s.parentId = this.model.id),
                (s.parentName = this.model.get("name"))),
              "Account" !== this.model.entityType &&
                this.model.has("contactsIds") &&
                ((s.contactsIds = this.model.get("contactsIds")),
                (s.contactsNames = this.model.get("contactsNames"))),
              e &&
                (s.parentId
                  ? s.parentType &&
                    !this.checkParentTypeAvailability(e, s.parentType) &&
                    ((s.parentType = null),
                    (s.parentId = null),
                    (s.parentName = null))
                  : this.checkParentTypeAvailability(
                      e,
                      this.model.entityType
                    ) &&
                    ((s.parentType = this.model.entityType),
                    (s.parentId = this.model.id),
                    (s.parentName = this.model.get("name"))));
          i.call(this, Espo.Utils.cloneDeep(s));
        }
        checkParentTypeAvailability(e, t) {
          return ~(
            this.getMetadata().get([
              "entityDefs",
              e,
              "fields",
              "parent",
              "entityList",
            ]) || []
          ).indexOf(t);
        }
        actionCreateRelated(e) {
          (e.link = this.entityTypeLinkMap[e.scope]),
            this.createEntityTypeStatusMap[e.scope] &&
              (e.status = this.createEntityTypeStatusMap[e.scope]),
            this.actionCreateActivity(e);
        }
        actionCreateActivity(e) {
          var t = e.link;
          let i,
            s,
            a =
              (t
                ? ((s = this.model.getLinkParam(t, "entity")),
                  (i = this.model.getLinkParam(t, "foreign")))
                : (s = e.scope),
              { scope: s }),
            n =
              (t && (a.relate = { model: this.model, link: i }),
              Espo.Ui.notify(" ... "),
              this.getMetadata().get("clientDefs." + s + ".modalViews.edit") ||
                "views/modals/edit");
          this.getCreateActivityAttributes(s, e, (e) => {
            (a.attributes = e),
              this.createView("quickCreate", n, a, (e) => {
                e.render(),
                  e.notify(!1),
                  this.listenToOnce(e, "after:save", () => {
                    this.model.trigger("after:relate"),
                      this.collection.fetch(),
                      this.fetchHistory();
                  });
              });
          });
        }
        getComposeEmailAttributes(e, t, i) {
          let s = { status: "Draft", to: this.model.get("emailAddress") },
            a =
              ("Contact" === this.model.entityType
                ? this.getConfig().get("b2cMode")
                  ? ((s.parentType = "Contact"),
                    (s.parentName = this.model.get("name")),
                    (s.parentId = this.model.id))
                  : this.model.get("accountId") &&
                    ((s.parentType = "Account"),
                    (s.parentId = this.model.get("accountId")),
                    (s.parentName = this.model.get("accountName")))
                : "Lead" === this.model.entityType &&
                  ((s.parentType = "Lead"),
                  (s.parentId = this.model.id),
                  (s.parentName = this.model.get("name"))),
              ~["Contact", "Lead", "Account"].indexOf(this.model.entityType) &&
                this.model.get("emailAddress") &&
                ((s.nameHash = {}),
                (s.nameHash[this.model.get("emailAddress")] =
                  this.model.get("name"))),
              e &&
                (s.parentId
                  ? s.parentType &&
                    !this.checkParentTypeAvailability(e, s.parentType) &&
                    ((s.parentType = null),
                    (s.parentId = null),
                    (s.parentName = null))
                  : this.checkParentTypeAvailability(
                      e,
                      this.model.entityType
                    ) &&
                    ((s.parentType = this.model.entityType),
                    (s.parentId = this.model.id),
                    (s.parentName = this.model.get("name")))),
              this.getConfig().get("emailKeepParentTeamsEntityList") || []);
          s.parentType &&
            s.parentType === this.model.entityType &&
            ~a.indexOf(s.parentType) &&
            this.model.get("teamsIds") &&
            this.model.get("teamsIds").length &&
            ((s.teamsIds = Espo.Utils.clone(this.model.get("teamsIds"))),
            (s.teamsNames = Espo.Utils.clone(
              this.model.get("teamsNames") || {}
            )),
            (e = this.getUser().get("defaultTeamId")) &&
              !~s.teamsIds.indexOf(e) &&
              (s.teamsIds.push(e),
              (s.teamsNames[e] = this.getUser().get("defaultTeamName"))),
            (s.teamsIds = s.teamsIds.filter((e) =>
              this.getAcl().checkTeamAssignmentPermission(e)
            ))),
            i.call(this, s);
        }
        actionComposeEmail(e) {
          let t = null;
          "emails" in this.model.defs.links &&
            (t = {
              model: this.model,
              link: this.model.defs.links.emails.foreign,
            }),
            Espo.Ui.notify(" ... "),
            this.getComposeEmailAttributes("Email", e, (e) => {
              this.createView(
                "quickCreate",
                "views/modals/compose-email",
                { relate: t, attributes: e },
                (e) => {
                  e.render(),
                    e.notify(!1),
                    this.listenToOnce(e, "after:save", () => {
                      this.collection.fetch(),
                        this.model.trigger("after:relate"),
                        this.fetchHistory();
                    });
                }
              );
            });
        }
        actionRefresh() {
          this.collection.fetch();
        }
        actionSetHeld(t) {
          t = t.id;
          if (t) {
            let e = this.collection.get(t);
            e.save({ status: "Held" }, { patch: !0 }).then(() => {
              this.collection.fetch(), this.fetchHistory();
            });
          }
        }
        actionSetNotHeld(t) {
          t = t.id;
          if (t) {
            let e = this.collection.get(t);
            e.save({ status: "Not Held" }, { patch: !0 }).then(() => {
              this.collection.fetch(), this.fetchHistory();
            });
          }
        }
        actionViewRelatedList(e) {
          (e.url =
            "Activities/" +
            this.model.entityType +
            "/" +
            this.model.id +
            "/" +
            this.name +
            "/list/" +
            e.scope),
            (e.title =
              this.translate(this.defs.label) +
              " @right " +
              this.translate(e.scope, "scopeNamesPlural")),
            (e.viewOptions = e.viewOptions || {}),
            (e.viewOptions.massUnlinkDisabled = !0),
            (e.viewOptions.fullFormUrl =
              "#" +
              this.model.entityType +
              "/" +
              this.name +
              "/" +
              this.model.id +
              "/" +
              e.scope),
            super.actionViewRelatedList(e);
        }
      }
      e.default = a;
    }
  ),
  define(
    "crm:views/opportunity/record/edit",
    ["views/record/edit"],
    function (i) {
      return i.extend({
        populateDefaults: function () {
          i.prototype.populateDefaults.call(this);
          var e =
              this.getMetadata().get(
                "entityDefs.Opportunity.fields.stage.probabilityMap"
              ) || {},
            t = this.model.get("stage");
          t in e && this.model.set("probability", e[t], { silent: !0 });
        },
      });
    }
  ),
  define(
    "crm:views/meeting/detail",
    ["views/detail", "lib!moment"],
    function (e, a) {
      return e.extend({
        cancellationPeriod: "8 hours",
        setup: function () {
          e.prototype.setup.call(this),
            this.controlSendInvitationsButton(),
            this.controlAcceptanceStatusButton(),
            this.controlSendCancellationButton(),
            this.listenTo(this.model, "sync", () => {
              this.controlSendInvitationsButton(),
                this.controlSendCancellationButton();
            }),
            this.listenTo(this.model, "sync", () => {
              this.controlAcceptanceStatusButton();
            }),
            this.setupCancellationPeriod();
        },
        setupCancellationPeriod: function () {
          (this.cancellationPeriodAmount = 0),
            (this.cancellationPeriodUnits = "hours");
          let e =
            this.getConfig().get("eventCancellationPeriod") ||
            this.cancellationPeriod;
          var t;
          e &&
            ((t = e.split(" ")),
            (this.cancellationPeriodAmount = parseInt(t[0])),
            (this.cancellationPeriodUnits = t[1] ?? "hours"));
        },
        controlAcceptanceStatusButton: function () {
          if (this.model.has("status") && this.model.has("usersIds"))
            if (~["Held", "Not Held"].indexOf(this.model.get("status")))
              this.removeMenuItem("setAcceptanceStatus");
            else if (
              ~this.model
                .getLinkMultipleIdList("users")
                .indexOf(this.getUser().id)
            ) {
              var s = this.model.getLinkMultipleColumn(
                "users",
                "status",
                this.getUser().id
              );
              let e,
                t = "default",
                i =
                  (s && "None" !== s
                    ? ((e = this.getLanguage().translateOption(
                        s,
                        "acceptanceStatus",
                        this.model.entityType
                      )),
                      (t = this.getMetadata().get([
                        "entityDefs",
                        this.model.entityType,
                        "fields",
                        "acceptanceStatus",
                        "style",
                        s,
                      ])))
                    : (e = this.translate("Acceptance", "labels", "Meeting")),
                  this.removeMenuItem("setAcceptanceStatus", !0),
                  "");
              t &&
                ((s = {
                  success: "fas fa-check-circle",
                  danger: "fas fa-times-circle",
                  warning: "fas fa-question-circle",
                }[t]),
                (i = $("<span>")
                  .addClass(s)
                  .addClass("text-" + t)
                  .get(0).outerHTML)),
                this.addMenuItem("buttons", {
                  text: e,
                  action: "setAcceptanceStatus",
                  iconHtml: i,
                });
            } else this.removeMenuItem("setAcceptanceStatus");
        },
        controlSendInvitationsButton: function () {
          let e = !0;
          var t, i, s;
          (e =
            (e = ["Held", "Not Held"].includes(this.model.get("status"))
              ? !1
              : e) && !this.getAcl().checkModel(this.model, "edit")
              ? !1
              : e) &&
            ((t = this.model.getLinkMultipleIdList("users")),
            (s = this.model.getLinkMultipleIdList("contacts")),
            (i = this.model.getLinkMultipleIdList("leads")),
            s.length || i.length || t.length || (e = !1)),
            !e ||
              ((s = this.model.get("dateEnd")) &&
                this.getDateTime().toMoment(s).isBefore(a.now()) &&
                (e = !1)),
            e
              ? this.addMenuItem("buttons", {
                  text: this.translate("Send Invitations", "labels", "Meeting"),
                  action: "sendInvitations",
                  acl: "edit",
                })
              : this.removeMenuItem("sendInvitations");
        },
        controlSendCancellationButton: function () {
          let e = "Not Held" === this.model.get("status");
          var t, i, s;
          !e ||
            ((t = this.model.get("dateEnd")) &&
              this.getDateTime()
                .toMoment(t)
                .subtract(
                  this.cancellationPeriodAmount,
                  this.cancellationPeriodUnits
                )
                .isBefore(a.now()) &&
              (e = !1)),
            e &&
              ((t = this.model.getLinkMultipleIdList("users")),
              (i = this.model.getLinkMultipleIdList("contacts")),
              (s = this.model.getLinkMultipleIdList("leads")),
              i.length || s.length || t.length || (e = !1)),
            e
              ? this.addMenuItem("dropdown", {
                  text: this.translate(
                    "Send Cancellation",
                    "labels",
                    "Meeting"
                  ),
                  action: "sendCancellation",
                  acl: "edit",
                })
              : this.removeMenuItem("sendCancellation");
        },
        actionSendInvitations: function () {
          Espo.Ui.notify(" ... "),
            this.createView(
              "dialog",
              "crm:views/meeting/modals/send-invitations",
              { model: this.model }
            ).then((e) => {
              Espo.Ui.notify(!1),
                e.render(),
                this.listenToOnce(e, "sent", () => this.model.fetch());
            });
        },
        actionSendCancellation: function () {
          Espo.Ui.notify(" ... "),
            this.createView(
              "dialog",
              "crm:views/meeting/modals/send-cancellation",
              { model: this.model }
            ).then((e) => {
              Espo.Ui.notify(!1),
                e.render(),
                this.listenToOnce(e, "sent", () => this.model.fetch());
            });
        },
        actionSetAcceptanceStatus: function () {
          this.createView(
            "dialog",
            "crm:views/meeting/modals/acceptance-status",
            { model: this.model },
            (e) => {
              e.render(),
                this.listenTo(e, "set-status", (e) => {
                  this.removeMenuItem("setAcceptanceStatus"),
                    Espo.Ajax.postRequest(
                      this.model.entityType + "/action/setAcceptanceStatus",
                      { id: this.model.id, status: e }
                    ).then(() => {
                      this.model.fetch();
                    });
                });
            }
          );
        },
      });
    }
  ),
  define("crm:views/meeting/record/list", ["views/record/list"], function (e) {
    return e.extend({
      rowActionsView: "crm:views/meeting/record/row-actions/default",
      setup: function () {
        e.prototype.setup.call(this),
          this.getAcl().checkScope(this.entityType, "edit") &&
            (this.massActionList.push("setHeld"),
            this.massActionList.push("setNotHeld"));
      },
      actionSetHeld: function (t) {
        t = t.id;
        if (t) {
          let e = this.collection.get(t);
          e &&
            (e.set("status", "Held"),
            this.listenToOnce(e, "sync", () => {
              Espo.Ui.notify(!1), this.collection.fetch();
            }),
            Espo.Ui.notify(this.translate("saving", "messages")),
            e.save());
        }
      },
      actionSetNotHeld: function (e) {
        var e = e.id;
        !e ||
          ((e = this.collection.get(e)) &&
            (e.set("status", "Not Held"),
            this.listenToOnce(e, "sync", () => {
              Espo.Ui.notify(!1), this.collection.fetch();
            }),
            Espo.Ui.notify(this.translate("saving", "messages")),
            e.save()));
      },
      massActionSetHeld: function () {
        Espo.Ui.notify(this.translate("saving", "messages"));
        let e = { ids: this.checkedList };
        Espo.Ajax.postRequest(
          this.collection.entityType + "/action/massSetHeld",
          e
        ).then(() => {
          Espo.Ui.notify(!1),
            this.listenToOnce(this.collection, "sync", () => {
              e.ids.forEach((e) => {
                this.collection.get(e) && this.checkRecord(e);
              });
            }),
            this.collection.fetch();
        });
      },
      massActionSetNotHeld: function () {
        Espo.Ui.notify(this.translate("saving", "messages"));
        let e = { ids: this.checkedList };
        Espo.Ajax.postRequest(
          this.collection.entityType + "/action/massSetNotHeld",
          e
        ).then(() => {
          Espo.Ui.notify(!1),
            this.listenToOnce(this.collection, "sync", () => {
              e.ids.forEach((e) => {
                this.collection.get(e) && this.checkRecord(e);
              });
            }),
            this.collection.fetch();
        });
      },
    });
  }),
  define(
    "crm:views/mass-email/record/edit",
    ["views/record/edit"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this), this.initFieldsControl();
        },
        initFieldsControl: function () {
          this.listenTo(this.model, "change:smtpAccount", (e, t, i) => {
            if (i.ui) {
              if (!t || "system" === t)
                return (
                  this.model.set(
                    "fromAddress",
                    this.getConfig().get("outboundEmailFromAddress") || ""
                  ),
                  void this.model.set(
                    "fromName",
                    this.getConfig().get("outboundEmailFromName") || ""
                  )
                );
              i = this.getFieldView("smtpAccount");
              i &&
                i.loadedOptionAddresses &&
                i.loadedOptionAddresses[t] &&
                (this.model.set("fromAddress", i.loadedOptionAddresses[t]),
                this.model.set("fromName", i.loadedOptionFromNames[t]));
            }
          });
        },
      });
    }
  ),
  define(
    "crm:views/document/modals/select-records",
    ["views/modals/select-records-with-categories"],
    function (e) {
      return e.extend({
        categoryScope: "DocumentFolder",
        categoryField: "folder",
        categoryFilterType: "inCategory",
      });
    }
  ),
  define(
    "crm:views/dashlets/options/chart",
    ["views/dashlets/options/base"],
    function (e) {
      return e.extend({
        setupBeforeFinal: function () {
          this.listenTo(
            this.model,
            "change:dateFilter",
            this.controlDateFilter
          ),
            this.controlDateFilter();
        },
        controlDateFilter: function () {
          "between" === this.model.get("dateFilter")
            ? (this.showField("dateFrom"), this.showField("dateTo"))
            : (this.hideField("dateFrom"), this.hideField("dateTo"));
        },
      });
    }
  ),
  define(
    "crm:views/contact/record/detail",
    ["views/record/detail"],
    function (e) {
      return e.extend({});
    }
  ),
  define("crm:views/call/record/list", ["views/record/list"], function (e) {
    return e.extend({
      rowActionsView: "crm:views/call/record/row-actions/default",
      setup: function () {
        e.prototype.setup.call(this),
          this.getAcl().checkScope(this.entityType, "edit") &&
            (this.massActionList.push("setHeld"),
            this.massActionList.push("setNotHeld"));
      },
      actionSetHeld: function (e) {
        var e = e.id;
        !e ||
          ((e = this.collection.get(e)) &&
            (e.set("status", "Held"),
            this.listenToOnce(e, "sync", () => {
              Espo.Ui.notify(!1), this.collection.fetch();
            }),
            Espo.Ui.notify(" ... "),
            e.save()));
      },
      actionSetNotHeld: function (t) {
        t = t.id;
        if (t) {
          let e = this.collection.get(t);
          e &&
            (e.set("status", "Not Held"),
            this.listenToOnce(e, "sync", () => {
              Espo.Ui.notify(!1), this.collection.fetch();
            }),
            Espo.Ui.notify(this.translate("saving", "messages")),
            e.save());
        }
      },
      massActionSetHeld: function () {
        Espo.Ui.notify(this.translate("saving", "messages"));
        let e = {};
        (e.ids = this.checkedList),
          Espo.Ajax.postRequest(
            this.collection.entityType + "/action/massSetHeld",
            e
          ).then(() => {
            Espo.Ui.notify(!1),
              this.listenToOnce(this.collection, "sync", () => {
                e.ids.forEach((e) => {
                  this.collection.get(e) && this.checkRecord(e);
                });
              }),
              this.collection.fetch();
          });
      },
      massActionSetNotHeld: function () {
        Espo.Ui.notify(this.translate("saving", "messages"));
        let e = {};
        (e.ids = this.checkedList),
          Espo.Ajax.postRequest(
            this.collection.entityType + "/action/massSetNotHeld",
            e
          ).then(() => {
            Espo.Ui.notify(!1),
              this.listenToOnce(this.collection, "sync", () => {
                e.ids.forEach((e) => {
                  this.collection.get(e) && this.checkRecord(e);
                });
              }),
              this.collection.fetch();
          });
      },
    });
  }),
  define(
    "crm:views/call/fields/contacts",
    ["crm:views/meeting/fields/contacts"],
    function (a) {
      return a.extend({
        getAttributeList: function () {
          let e = a.prototype.getAttributeList.call(this);
          return e.push("phoneNumbersMap"), e;
        },
        getDetailLinkHtml: function (e, t) {
          var t = a.prototype.getDetailLinkHtml.call(this, e, t),
            e = this.foreignScope + "_" + e,
            i = this.model.get("phoneNumbersMap") || {};
          if (!(e in i)) return t;
          i = i[e];
          let s = $(t);
          return (
            s.append(
              " ",
              $("<span>").addClass("text-muted chevron-right"),
              " ",
              $("<a>")
                .attr("href", "tel:" + i)
                .attr("data-phone-number", i)
                .attr("data-action", "dial")
                .addClass("small")
                .text(i)
            ),
            $("<div>").append(s).get(0).outerHTML
          );
        },
      });
    }
  ),
  define("modules/crm/acl/meeting", ["exports", "acl"], function (e, t) {
    "use strict";
    var i;
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    class s extends (t = (i = t) && i.__esModule ? i : { default: i }).default {
      checkModelRead(e, t, i) {
        return this._checkModelCustom("read", e, t, i);
      }
      checkModelStream(e, t, i) {
        return this._checkModelCustom("stream", e, t, i);
      }
      _checkModelCustom(e, t, i, s) {
        var a = this.checkModel(t, i, e, s);
        if (a) return !0;
        if (!1 === i) return !1;
        if ("no" === (i || {})[e]) return !1;
        if (t.has("usersIds")) {
          if (~(t.get("usersIds") || []).indexOf(this.getUser().id)) return !0;
        } else if (s) return null;
        return a;
      }
    }
    e.default = s;
  }),
  define("views/notification/items/base", ["exports", "view"], function (e, t) {
    "use strict";
    var i;
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    class s extends (t = (i = t) && i.__esModule ? i : { default: i }).default {
      messageName;
      messageTemplate;
      messageData = null;
      isSystemAvatar = !1;
      data() {
        return { avatar: this.getAvatarHtml() };
      }
      init() {
        this.createField(
          "createdAt",
          null,
          null,
          "views/fields/datetime-short"
        ),
          (this.messageData = {});
      }
      createField(e, t, i, s) {
        (t = t || this.model.getFieldType(e) || "base"),
          this.createView(e, s || this.getFieldManager().getViewName(t), {
            model: this.model,
            defs: { name: e, params: i || {} },
            selector: ".cell-" + e,
            mode: "list",
          });
      }
      createMessage() {
        var e = this.model.get("relatedParentType") || null;
        !this.messageTemplate &&
          this.messageName &&
          (this.messageTemplate =
            this.translate(this.messageName, "notificationMessages", e) || ""),
          0 === this.messageTemplate.indexOf("{entityType}") &&
            "string" == typeof this.messageData.entityType &&
            ((this.messageData.entityTypeUcFirst = Espo.Utils.upperCaseFirst(
              this.messageData.entityType
            )),
            (this.messageTemplate = this.messageTemplate.replace(
              "{entityType}",
              "{entityTypeUcFirst}"
            ))),
          this.createView("message", "views/stream/message", {
            messageTemplate: this.messageTemplate,
            selector: ".message",
            model: this.model,
            messageData: this.messageData,
          });
      }
      getAvatarHtml() {
        let e = this.userId;
        return (
          (!this.isSystemAvatar && e) ||
            (e = this.getHelper().getAppParam("systemUserId")),
          this.getHelper().getAvatarHtml(e, "small", 20)
        );
      }
      translateEntityType(e, t) {
        let i = t
          ? this.translate(e, "scopeNamesPlural") || ""
          : this.translate(e, "scopeNames") || "";
        i = i.toLowerCase();
        t =
          this.getPreferences().get("language") ||
          this.getConfig().get("language");
        return (i = ~["de_DE", "nl_NL"].indexOf(t)
          ? Espo.Utils.upperCaseFirst(i)
          : i);
      }
    }
    e.default = s;
  }),
  define(
    "views/lead-capture/fields/smtp-account",
    ["views/fields/enum"],
    function (t) {
      return t.extend({
        dataUrl: "LeadCapture/action/smtpAccountDataList",
        getAttributeList: function () {
          return [this.name, "inboundEmailId"];
        },
        data: function () {
          var e = t.prototype.data.call(this);
          return (e.valueIsSet = !0), (e.isNotEmpty = !0), e;
        },
        setupOptions: function () {
          var e;
          t.prototype.setupOptions.call(this),
            (this.params.options = []),
            (this.translatedOptions = {}),
            this.params.options.push("system"),
            this.loadedOptionList
              ? this.loadedOptionList.forEach((e) => {
                  this.params.options.push(e),
                    (this.translatedOptions[e] =
                      (this.loadedOptionTranslations[e] || e) +
                      " (" +
                      this.translate("group", "labels", "MassEmail") +
                      ")");
                })
              : this.model.get("inboundEmailId") &&
                ((e = "inboundEmail:" + this.model.get("inboundEmailId")),
                this.params.options.push(e),
                (this.translatedOptions[e] =
                  (this.model.get("inboundEmailName") ||
                    this.model.get("inboundEmailId")) +
                  " (" +
                  this.translate("group", "labels", "MassEmail") +
                  ")")),
            (this.translatedOptions.system =
              this.getConfig().get("outboundEmailFromAddress") +
              " (" +
              this.translate("system", "labels", "MassEmail") +
              ")");
        },
        getValueForDisplay: function () {
          return !this.model.has(this.name) && this.isReadMode()
            ? this.model.has("inboundEmailId")
              ? this.model.get("inboundEmailId")
                ? "inboundEmail:" + this.model.get("inboundEmailId")
                : "system"
              : "..."
            : this.model.get(this.name);
        },
        setup: function () {
          t.prototype.setup.call(this),
            (this.getAcl().checkScope("MassEmail", "create") ||
              this.getAcl().checkScope("MassEmail", "edit")) &&
              Espo.Ajax.getRequest(this.dataUrl).then((e) => {
                e.length &&
                  ((this.loadedOptionList = []),
                  (this.loadedOptionTranslations = {}),
                  (this.loadedOptionAddresses = {}),
                  (this.loadedOptionFromNames = {}),
                  e.forEach((e) => {
                    this.loadedOptionList.push(e.key),
                      (this.loadedOptionTranslations[e.key] = e.emailAddress),
                      (this.loadedOptionAddresses[e.key] = e.emailAddress),
                      (this.loadedOptionFromNames[e.key] = e.fromName || "");
                  }),
                  this.setupOptions(),
                  this.reRender());
              });
        },
        fetch: function () {
          var e = {},
            t = this.$element.val();
          return (
            (e[this.name] = t) && "system" !== t
              ? 1 < (t = t.split(":")).length &&
                ((e.inboundEmailId = t[1]),
                (e.inboundEmailName =
                  this.translatedOptions[e.inboundEmailId] || e.inboundEmailId))
              : ((e.inboundEmailId = null), (e.inboundEmailName = null)),
            e
          );
        },
      });
    }
  ),
  define("handlers/create-related", ["exports"], function (e) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    e.default = class {
      constructor(e) {
        this.viewHelper = e;
      }
      getAttributes(e) {
        return Promise.resolve({});
      }
    };
  }),
  define("handlers/row-action", ["exports"], function (e) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    e.default = class {
      constructor(e) {
        (this.view = e), (this.collection = this.view.collection);
      }
      isAvailable(e, t) {
        return !0;
      }
      process(e, t) {}
    };
  }),
  define(
    "crm:views/user/record/panels/tasks",
    ["crm:views/record/panels/tasks"],
    function (t) {
      return t.extend({
        listLayout: {
          rows: [
            [{ name: "name", link: !0 }, { name: "isOverdue" }],
            [{ name: "status" }, { name: "dateEnd" }],
          ],
        },
        setup: function () {
          var e;
          t.prototype.setup.call(this),
            !this.getMetadata().get([
              "entityDefs",
              "Task",
              "fields",
              "assignedUsers",
            ]) ||
              ((e = this.getMetadata().get([
                "entityDefs",
                "Task",
                "links",
                "assignedUsers",
                "foreign",
              ])) &&
                (this.link = e));
        },
      });
    }
  ),
  define("crm:views/task/list", ["views/list"], function (e) {
    return e.extend({});
  }),
  define("crm:views/task/detail", ["views/detail"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/task/record/list-expanded",
    ["views/record/list-expanded", "crm:views/task/record/list"],
    function (e, t) {
      return e.extend({
        rowActionsView: "crm:views/task/record/row-actions/default",
        actionSetCompleted: function (e) {
          t.prototype.actionSetCompleted.call(this, e);
        },
      });
    }
  ),
  define("crm:views/task/record/detail", ["views/record/detail"], function (t) {
    return t.extend({
      duplicateAction: !0,
      setupActionItems: function () {
        t.prototype.setupActionItems.call(this),
          this.getAcl().checkModel(this.model, "edit") &&
            (!~["Completed", "Canceled"].indexOf(this.model.get("status")) &&
              this.getAcl().checkField(this.entityType, "status", "edit") &&
              this.dropdownItemList.push({
                label: "Complete",
                name: "setCompleted",
              }),
            this.listenToOnce(
              this.model,
              "sync",
              function () {
                ~["Completed", "Canceled"].indexOf(this.model.get("status")) &&
                  this.removeButton("setCompleted");
              },
              this
            ));
      },
      manageAccessEdit: function (e) {
        t.prototype.manageAccessEdit.call(this, e),
          e &&
            (this.getAcl().checkModel(this.model, "edit", !0) ||
              this.hideActionItem("setCompleted"));
      },
      actionSetCompleted: function () {
        this.model
          .save({ status: "Completed" }, { patch: !0 })
          .then(() => Espo.Ui.success(this.translate("Saved")));
      },
    });
  }),
  define(
    "crm:views/task/record/row-actions/default",
    ["views/record/row-actions/view-and-edit"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            this.options.acl.edit &&
              !~["Completed", "Canceled"].indexOf(this.model.get("status")) &&
              e.push({
                action: "setCompleted",
                label: "Complete",
                data: { id: this.model.id },
              }),
            this.options.acl.delete &&
              e.push({
                action: "quickRemove",
                label: "Remove",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/task/record/row-actions/dashlet",
    ["views/record/row-actions/view-and-edit"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            this.options.acl.edit &&
              !~["Completed", "Canceled"].indexOf(this.model.get("status")) &&
              e.push({
                action: "setCompleted",
                label: "Complete",
                data: { id: this.model.id },
              }),
            this.options.acl.delete &&
              e.push({
                action: "quickRemove",
                label: "Remove",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
            e
          );
        },
      });
    }
  ),
  define("crm:views/task/modals/detail", ["views/modals/detail"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/task/fields/priority-for-dashlet",
    ["views/fields/enum"],
    function (t) {
      return t.extend({
        data: function () {
          var e = t.prototype.data.call(this);
          return (e.style && "default" !== e.style) || (e.isNotEmpty = !1), e;
        },
      });
    }
  ),
  define(
    "crm:views/task/fields/is-overdue",
    ["views/fields/base"],
    function (e) {
      return e.extend({
        readOnly: !0,
        templateContent: `
            {{#if isOverdue}}
            <span class="label label-danger">{{translate "overdue" scope="Task"}}</span>
            {{/if}}
        `,
        data: function () {
          var i = !1;
          if (
            -1 ===
              ["Completed", "Canceled"].indexOf(this.model.get("status")) &&
            this.model.has("dateEnd")
          )
            if (this.isDate()) {
              var s = this.model.get("dateEndDate");
              if (s) {
                let e = moment.utc(
                    s + " 23:59",
                    this.getDateTime().internalDateTimeFormat
                  ),
                  t = this.getDateTime().getNowMoment();
                e.unix() < t.unix() && (i = !0);
              }
            } else {
              s = this.model.get("dateEnd");
              if (s) {
                let e = this.getDateTime().toMoment(s),
                  t = moment().tz(this.getDateTime().timeZone || "UTC");
                e.unix() < t.unix() && (i = !0);
              }
            }
          return { isOverdue: i };
        },
        setup: function () {
          this.mode = "detail";
        },
        isDate: function () {
          return !!this.model.get("dateEnd");
        },
      });
    }
  ),
  define(
    "crm:views/task/fields/date-end",
    ["views/fields/datetime-optional"],
    function (e) {
      return e.extend({
        detailTemplate: "crm:task/fields/date-end/detail",
        listTemplate: "crm:task/fields/date-end/detail",
        isEnd: !0,
        data: function () {
          var i = e.prototype.data.call(this);
          if (
            this.model.get("status") &&
            !~["Completed", "Canceled"].indexOf(this.model.get("status")) &&
            ("list" === this.mode || "detail" === this.mode)
          )
            if (this.isDate()) {
              var s = this.model.get(this.nameDate);
              if (s) {
                let e = moment.utc(
                    s + " 23:59",
                    this.getDateTime().internalDateTimeFormat
                  ),
                  t = this.getDateTime().getNowMoment();
                e.unix() < t.unix() && (i.isOverdue = !0);
              }
            } else {
              s = this.model.get(this.name);
              if (s) {
                let e = this.getDateTime().toMoment(s),
                  t = moment().tz(this.getDateTime().timeZone || "UTC");
                e.unix() < t.unix() && (i.isOverdue = !0);
              }
            }
          return i;
        },
        setup: function () {
          e.prototype.setup.call(this),
            this.listenTo(this, "change", () => {
              this.model.get("dateEnd") ||
                (this.model.get("reminders") &&
                  this.model.set("reminders", []));
            });
        },
      });
    }
  ),
  define(
    "crm:views/target-list/record/detail",
    ["views/record/detail"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            this.listenTo(this.model, "after:relate", () => {
              this.model.fetch();
            }),
            this.listenTo(this.model, "after:unrelate", () => {
              this.model.fetch();
            });
        },
      });
    }
  ),
  define(
    "crm:views/target-list/record/row-actions/opted-out",
    ["views/record/row-actions/default"],
    function (e) {
      return e.extend({
        getActionList: function () {
          return [
            {
              action: "cancelOptOut",
              label: "Cancel Opt-Out",
              data: { id: this.model.id, type: this.model.entityType },
            },
          ];
        },
      });
    }
  ),
  define(
    "crm:views/target-list/record/row-actions/default",
    ["views/record/row-actions/relationship"],
    function (t) {
      return t.extend({
        getActionList: function () {
          const e = t.prototype.getActionList.call(this);
          return (
            this.options.acl.edit &&
              (this.model.get("targetListIsOptedOut")
                ? e.push({
                    action: "cancelOptOut",
                    label: "Cancel Opt-Out",
                    data: { id: this.model.id, type: this.model.entityType },
                  })
                : e.push({
                    action: "optOut",
                    label: "Opt-Out",
                    data: { id: this.model.id, type: this.model.entityType },
                  })),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/target-list/record/panels/relationship",
    ["views/record/panels/relationship"],
    function (e) {
      return e.extend({
        fetchOnModelAfterRelate: !0,
        actionOptOut: function (e) {
          this.confirm(this.translate("confirmation", "messages"), () => {
            Espo.Ajax.postRequest("TargetList/action/optOut", {
              id: this.model.id,
              targetId: e.id,
              targetType: e.type,
            }).then(() => {
              this.collection.fetch(),
                Espo.Ui.success(this.translate("Done")),
                this.model.trigger("opt-out");
            });
          });
        },
        actionCancelOptOut: function (e) {
          this.confirm(this.translate("confirmation", "messages"), () => {
            Espo.Ajax.postRequest("TargetList/action/cancelOptOut", {
              id: this.model.id,
              targetId: e.id,
              targetType: e.type,
            }).then(() => {
              this.collection.fetch(),
                Espo.Ui.success(this.translate("Done")),
                this.collection.fetch(),
                this.model.trigger("cancel-opt-out");
            });
          });
        },
      });
    }
  ),
  define(
    "crm:views/target-list/record/panels/opted-out",
    ["views/record/panels/relationship", "multi-collection"],
    function (e, t) {
      return e.extend({
        name: "optedOut",
        template: "crm:target-list/record/panels/opted-out",
        scopeList: ["Contact", "Lead", "User", "Account"],
        data: function () {
          return { currentTab: this.currentTab, scopeList: this.scopeList };
        },
        getStorageKey: function () {
          return (
            "target-list-opted-out-" + this.model.entityType + "-" + this.name
          );
        },
        setup: function () {
          this.seeds = {};
          let e =
            this.getMetadata().get([
              "scopes",
              "TargetList",
              "targetLinkList",
            ]) || [];
          var i;
          (this.scopeList = []),
            e.forEach((e) => {
              e = this.getMetadata().get([
                "entityDefs",
                "TargetList",
                "links",
                e,
                "entity",
              ]);
              e && this.scopeList.push(e);
            }),
            (this.listLayout = {}),
            this.scopeList.forEach((e) => {
              this.listLayout[e] = { rows: [[{ name: "name", link: !0 }]] };
            }),
            this.scopeList.length &&
              (this.wait(!0),
              (i = 0),
              this.scopeList.forEach((t) => {
                this.getModelFactory().create(t, (e) => {
                  (this.seeds[t] = e),
                    ++i === this.scopeList.length && this.wait(!1);
                });
              })),
            this.listenTo(this.model, "opt-out", () => {
              this.actionRefresh();
            }),
            this.listenTo(this.model, "cancel-opt-out", () => {
              this.actionRefresh();
            });
        },
        afterRender: function () {
          var e = "TargetList/" + this.model.id + "/" + this.name;
          (this.collection = new t()),
            (this.collection.seeds = this.seeds),
            (this.collection.url = e),
            (this.collection.maxSize =
              this.getConfig().get("recordsPerPageSmall") || 5),
            this.listenToOnce(this.collection, "sync", () => {
              this.createView(
                "list",
                "views/record/list-expanded",
                {
                  selector: "> .list-container",
                  pagination: !1,
                  type: "listRelationship",
                  rowActionsView:
                    "crm:views/target-list/record/row-actions/opted-out",
                  checkboxes: !1,
                  collection: this.collection,
                  listLayout: this.listLayout,
                },
                (e) => {
                  e.render();
                }
              );
            }),
            this.collection.fetch();
        },
        actionRefresh: function () {
          this.collection.fetch();
        },
        actionCancelOptOut: function (e) {
          this.confirm(this.translate("confirmation", "messages"), () => {
            Espo.Ajax.postRequest("TargetList/action/cancelOptOut", {
              id: this.model.id,
              targetId: e.id,
              targetType: e.type,
            }).then(() => {
              this.collection.fetch();
            });
          });
        },
      });
    }
  ),
  define(
    "crm:views/target-list/fields/target-status",
    ["views/fields/base"],
    function (e) {
      return e.extend({
        getValueForDisplay: function () {
          return this.model.get("isOptedOut")
            ? this.getLanguage().translateOption(
                "Opted Out",
                "targetStatus",
                "TargetList"
              )
            : this.getLanguage().translateOption(
                "Listed",
                "targetStatus",
                "TargetList"
              );
        },
      });
    }
  ),
  define(
    "crm:views/target-list/fields/including-action-list",
    ["views/fields/multi-enum"],
    function (e) {
      return e.extend({
        setupOptions: function () {
          (this.params.options =
            this.getMetadata().get(
              "entityDefs.CampaignLogRecord.fields.action.options"
            ) || []),
            (this.translatedOptions = {}),
            this.params.options.forEach((e) => {
              this.translatedOptions[e] = this.getLanguage().translateOption(
                e,
                "action",
                "CampaignLogRecord"
              );
            });
        },
      });
    }
  ),
  define(
    "crm:views/stream/notes/event-confirmation",
    ["views/stream/note"],
    function (t) {
      return t.extend({
        templateContent: `
            {{#unless noEdit}}
            <div class="pull-right right-container cell-buttons">
            {{{right}}}
            </div>
            {{/unless}}

            <div class="stream-head-container">
                <div class="pull-left">
                    {{{avatar}}}
                </div>
                <div class="stream-head-text-container">
                    <span class="{{iconClass}} text-{{style}}"></span>
                    <span class="text-muted message">{{{message}}}</span>
                </div>
            </div>
            <div class="stream-date-container">
                <a class="text-muted small" href="#Note/view/{{model.id}}">{{{createdAt}}}</a>
            </div>
        `,
        data: function () {
          var e =
            {
              success: "fas fa-check fa-sm",
              danger: "fas fa-times fa-sm",
              warning: "fas fa-question fa-sm",
            }[this.style] || "";
          return _.extend(
            { statusText: this.statusText, style: this.style, iconClass: e },
            t.prototype.data.call(this)
          );
        },
        init: function () {
          this.getUser().isAdmin() && (this.isRemovable = !0),
            t.prototype.init.call(this);
        },
        setup: function () {
          (this.inviteeType = this.model.get("relatedType")),
            (this.inviteeId = this.model.get("relatedId")),
            (this.inviteeName = this.model.get("relatedName"));
          var e = this.model.get("data") || {},
            t = e.status || "Tentative";
          (this.style = e.style || "default"),
            (this.statusText = this.getLanguage().translateOption(
              t,
              "acceptanceStatus",
              "Meeting"
            )),
            (this.messageName = "eventConfirmation" + t),
            this.isThis && (this.messageName += "This"),
            (this.messageData.invitee = $("<a>")
              .attr("href", "#" + this.inviteeType + "/view/" + this.inviteeId)
              .attr("data-id", this.inviteeId)
              .attr("data-scope", this.inviteeType)
              .text(this.inviteeName)),
            this.createMessage();
        },
      });
    }
  ),
  define(
    "crm:views/record/list-activities-dashlet",
    [
      "views/record/list-expanded",
      "crm:views/meeting/record/list",
      "crm:views/task/record/list",
    ],
    function (e, t, i) {
      return e.extend({
        actionSetHeld: function (e) {
          t.prototype.actionSetHeld.call(this, e);
        },
        actionSetNotHeld: function (e) {
          t.prototype.actionSetNotHeld.call(this, e);
        },
        actionSetCompleted: function (e) {
          i.prototype.actionSetCompleted.call(this, e);
        },
      });
    }
  ),
  define(
    "crm:views/record/row-actions/tasks",
    ["views/record/row-actions/relationship-no-unlink"],
    function (e) {
      return e.extend({
        getActionList: function () {
          var e = [
            {
              action: "quickView",
              label: "View",
              data: { id: this.model.id },
              link: "#" + this.model.entityType + "/view/" + this.model.id,
            },
          ];
          return (
            this.options.acl.edit &&
              (e.push({
                action: "quickEdit",
                label: "Edit",
                data: { id: this.model.id },
                link: "#" + this.model.entityType + "/edit/" + this.model.id,
              }),
              ~["Completed", "Canceled"].indexOf(this.model.get("status")) ||
                e.push({
                  action: "Complete",
                  text: this.translate("Complete", "labels", "Task"),
                  data: { id: this.model.id },
                })),
            this.options.acl.delete &&
              e.push({
                action: "removeRelated",
                label: "Remove",
                data: { id: this.model.id },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/record/row-actions/relationship-target",
    ["views/record/row-actions/relationship-unlink-only"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            this.options.acl.edit &&
              (this.model.get("isOptedOut")
                ? e.push({
                    action: "cancelOptOut",
                    text: this.translate(
                      "Cancel Opt-Out",
                      "labels",
                      "TargetList"
                    ),
                    data: { id: this.model.id },
                  })
                : e.push({
                    action: "optOut",
                    text: this.translate("Opt-Out", "labels", "TargetList"),
                    data: { id: this.model.id },
                  })),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/record/row-actions/history",
    ["views/record/row-actions/relationship"],
    function (e) {
      return e.extend({
        getActionList: function () {
          var e = [
            {
              action: "quickView",
              label: "View",
              data: { id: this.model.id },
              link: "#" + this.model.entityType + "/view/" + this.model.id,
            },
          ];
          return (
            "Email" === this.model.entityType &&
              e.push({
                action: "reply",
                text: this.translate("Reply", "labels", "Email"),
                data: { id: this.model.id },
              }),
            this.options.acl.edit &&
              (e = e.concat([
                {
                  action: "quickEdit",
                  label: "Edit",
                  data: { id: this.model.id },
                  link: "#" + this.model.entityType + "/edit/" + this.model.id,
                },
              ])),
            this.options.acl.delete &&
              e.push({
                action: "removeRelated",
                label: "Remove",
                data: { id: this.model.id },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/record/row-actions/activities",
    ["views/record/row-actions/relationship"],
    function (e) {
      return e.extend({
        getActionList: function () {
          var e = [
            {
              action: "quickView",
              label: "View",
              data: { id: this.model.id },
              link: "#" + this.model.entityType + "/view/" + this.model.id,
            },
          ];
          return (
            this.options.acl.edit &&
              (e.push({
                action: "quickEdit",
                label: "Edit",
                data: { id: this.model.id },
                link: "#" + this.model.entityType + "/edit/" + this.model.id,
              }),
              ("Meeting" !== this.model.entityType &&
                "Call" !== this.model.entityType) ||
                (e.push({
                  action: "setHeld",
                  text: this.translate("Set Held", "labels", "Meeting"),
                  data: { id: this.model.id },
                }),
                e.push({
                  action: "setNotHeld",
                  text: this.translate("Set Not Held", "labels", "Meeting"),
                  data: { id: this.model.id },
                }))),
            this.options.acl.delete &&
              e.push({
                action: "removeRelated",
                label: "Remove",
                data: { id: this.model.id },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/record/row-actions/activities-dashlet",
    ["views/record/row-actions/view-and-edit"],
    function (i) {
      return i.extend({
        getActionList: function () {
          var e = i.prototype.getActionList.call(this),
            t = this.model.entityType;
          return (
            e.forEach(function (e) {
              (e.data = e.data || {}), (e.data.scope = this.model.entityType);
            }, this),
            "Task" === t
              ? this.options.acl.edit &&
                !~["Completed", "Canceled"].indexOf(this.model.get("status")) &&
                e.push({
                  action: "setCompleted",
                  label: "Complete",
                  data: { id: this.model.id },
                })
              : this.options.acl.edit &&
                !~["Held", "Not Held"].indexOf(this.model.get("status")) &&
                (e.push({
                  action: "setHeld",
                  label: "Set Held",
                  data: { id: this.model.id, scope: this.model.entityType },
                }),
                e.push({
                  action: "setNotHeld",
                  label: "Set Not Held",
                  data: { id: this.model.id, scope: this.model.entityType },
                })),
            this.options.acl.edit &&
              e.push({
                action: "quickRemove",
                label: "Remove",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/record/panels/target-lists",
    ["views/record/panels/relationship"],
    function (e) {
      return e.extend({
        actionOptOut: function (e) {
          this.confirm(this.translate("confirmation", "messages"), () => {
            Espo.Ajax.postRequest("TargetList/action/optOut", {
              id: e.id,
              targetId: this.model.id,
              targetType: this.model.entityType,
            }).then(() => {
              this.collection.fetch(),
                Espo.Ui.success(this.translate("Done")),
                this.model.trigger("opt-out");
            });
          });
        },
        actionCancelOptOut: function (e) {
          this.confirm(this.translate("confirmation", "messages"), () => {
            Espo.Ajax.postRequest("TargetList/action/cancelOptOut", {
              id: e.id,
              targetId: this.model.id,
              targetType: this.model.entityType,
            }).then(() => {
              this.collection.fetch(),
                Espo.Ui.success(this.translate("Done")),
                this.model.trigger("cancel-opt-out");
            });
          });
        },
      });
    }
  ),
  define(
    "modules/crm/views/record/panels/history",
    ["exports", "crm:views/record/panels/activities", "email-helper"],
    function (e, t, i) {
      "use strict";
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0),
        (t = s(t)),
        (i = s(i));
      class a extends t.default {
        name = "history";
        orderBy = "dateStart";
        orderDirection = "desc";
        rowActionsView = "crm:views/record/row-actions/history";
        actionList = [];
        listLayout = {
          Email: {
            rows: [
              [
                { name: "ico", view: "crm:views/fields/ico" },
                { name: "name", link: !0 },
              ],
              [
                { name: "status" },
                { name: "dateSent" },
                {
                  name: "hasAttachment",
                  view: "views/email/fields/has-attachment",
                },
              ],
            ],
          },
        };
        where = { scope: !1 };
        setupActionList() {
          super.setupActionList(),
            this.actionList.push({
              action: "archiveEmail",
              label: "Archive Email",
              acl: "create",
              aclScope: "Email",
            });
        }
        getArchiveEmailAttributes(e, t, i) {
          let s = {
            dateSent: this.getDateTime().getNow(15),
            status: "Archived",
            from: this.model.get("emailAddress"),
            to: this.getUser().get("emailAddress"),
          };
          "Contact" === this.model.entityType
            ? this.getConfig().get("b2cMode")
              ? ((s.parentType = "Contact"),
                (s.parentName = this.model.get("name")),
                (s.parentId = this.model.id))
              : this.model.get("accountId") &&
                ((s.parentType = "Account"),
                (s.parentId = this.model.get("accountId")),
                (s.parentName = this.model.get("accountName")))
            : "Lead" === this.model.entityType &&
              ((s.parentType = "Lead"),
              (s.parentId = this.model.id),
              (s.parentName = this.model.get("name"))),
            (s.nameHash = {}),
            (s.nameHash[this.model.get("emailAddress")] =
              this.model.get("name")),
            e &&
              (s.parentId
                ? s.parentType &&
                  !this.checkParentTypeAvailability(e, s.parentType) &&
                  ((s.parentType = null),
                  (s.parentId = null),
                  (s.parentName = null))
                : this.checkParentTypeAvailability(e, this.model.entityType) &&
                  ((s.parentType = this.model.entityType),
                  (s.parentId = this.model.id),
                  (s.parentName = this.model.get("name")))),
            i.call(this, s);
        }
        actionArchiveEmail(e) {
          let t = "Email",
            i = null,
            s =
              ("emails" in this.model.defs.links &&
                (i = {
                  model: this.model,
                  link: this.model.defs.links.emails.foreign,
                }),
              Espo.Ui.notify(" ... "),
              this.getMetadata().get("clientDefs.Email.modalViews.edit") ||
                "views/modals/edit");
          this.getArchiveEmailAttributes(t, e, (e) => {
            this.createView(
              "quickCreate",
              s,
              { scope: t, relate: i, attributes: e },
              (e) => {
                e.render(),
                  e.notify(!1),
                  this.listenToOnce(e, "after:save", () => {
                    this.collection.fetch(), this.model.trigger("after:relate");
                  });
              }
            );
          });
        }
        actionReply(a) {
          let e = a.id;
          if (e) {
            let s = new i.default(
              this.getLanguage(),
              this.getUser(),
              this.getDateTime(),
              this.getAcl()
            );
            Espo.Ui.notify(" ... "),
              this.getModelFactory()
                .create("Email")
                .then((i) => {
                  (i.id = e),
                    i
                      .fetch()
                      .then(() => {
                        var e = s.getReplyAttributes(
                            i,
                            a,
                            this.getPreferences().get(
                              "emailReplyToAllByDefault"
                            )
                          ),
                          t =
                            this.getMetadata().get(
                              "clientDefs.Email.modalViews.compose"
                            ) || "views/modals/compose-email";
                        return this.createView("quickCreate", t, {
                          attributes: e,
                          focusForCreate: !0,
                        });
                      })
                      .then((e) => {
                        e.render(),
                          this.listenToOnce(e, "after:save", () => {
                            this.collection.fetch(),
                              this.model.trigger("after:relate");
                          }),
                          Espo.Ui.notify(!1);
                      });
                });
          }
        }
      }
      e.default = a;
    }
  ),
  define("crm:views/opportunity/detail", ["views/detail"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/opportunity/record/list",
    ["views/record/list"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/opportunity/record/kanban",
    ["views/record/kanban"],
    function (e) {
      return e.extend({
        handleAttributesOnGroupChange: function (e, t, i) {
          "stage" === this.statusField &&
            ((i = this.getMetadata().get([
              "entityDefs",
              "Opportunity",
              "fields",
              "stage",
              "probabilityMap",
              i,
            ])),
            (i = parseInt(i)),
            (t.probability = i));
        },
      });
    }
  ),
  define(
    "crm:views/opportunity/record/edit-small",
    ["views/record/edit-small", "crm:views/opportunity/record/edit"],
    function (e, t) {
      return e.extend({
        populateDefaults: function () {
          e.prototype.populateDefaults.call(this),
            t.prototype.populateDefaults.call(this);
        },
      });
    }
  ),
  define(
    "crm:views/opportunity/record/panels/activities",
    ["crm:views/record/panels/activities"],
    function (i) {
      return i.extend({
        getComposeEmailAttributes: function (e, t, s) {
          (t = t || {}),
            Espo.Ui.notify(" ... "),
            i.prototype.getComposeEmailAttributes.call(this, e, t, (i) => {
              Espo.Ajax.getRequest(
                "Opportunity/action/emailAddressList?id=" + this.model.id
              ).then((e) => {
                (i.to = ""),
                  (i.cc = ""),
                  (i.nameHash = {}),
                  e.forEach((e, t) => {
                    (i.to += e.emailAddress + ";"),
                      (i.nameHash[e.emailAddress] = e.name);
                  }),
                  Espo.Ui.notify(!1),
                  s.call(this, i);
              });
            });
        },
      });
    }
  ),
  define(
    "crm:views/opportunity/fields/stage",
    ["views/fields/enum"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            (this.probabilityMap =
              this.getMetadata().get(
                "entityDefs.Opportunity.fields.stage.probabilityMap"
              ) || {}),
            "list" !== this.mode &&
              this.on("change", () => {
                var e = this.probabilityMap[this.model.get(this.name)];
                null != e && this.model.set("probability", e);
              });
        },
      });
    }
  ),
  define(
    "crm:views/opportunity/fields/lead-source",
    ["views/fields/enum"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/opportunity/fields/last-stage",
    ["views/fields/enum"],
    function (i) {
      return i.extend({
        setup: function () {
          var e = this.getMetadata().get(
              "entityDefs.Opportunity.fields.stage.options",
              []
            ),
            t = this.getMetadata().get(
              "entityDefs.Opportunity.fields.stage.probabilityMap",
              {}
            );
          (this.params.options = []),
            e.forEach((e) => {
              t[e] && 100 !== t[e] && this.params.options.push(e);
            }),
            (this.params.translation = "Opportunity.options.stage"),
            i.prototype.setup.call(this);
        },
      });
    }
  ),
  define(
    "crm:views/opportunity/fields/contacts",
    ["views/fields/link-multiple-with-columns-with-primary"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/opportunity/fields/contact-role",
    ["views/fields/enum"],
    function (e) {
      return e.extend({ searchTypeList: ["anyOf", "noneOf"] });
    }
  ),
  define(
    "crm:views/opportunity/admin/field-manager/fields/probability-map",
    ["views/fields/base"],
    function (e) {
      return e.extend({
        editTemplate:
          "crm:opportunity/admin/field-manager/fields/probability-map/edit",
        setup: function () {
          e.prototype.setup.call(this),
            this.listenTo(this.model, "change:options", function (e, t, i) {
              let s = this.model.get("probabilityMap") || {};
              i.ui &&
                ((this.model.get("options") || []).forEach((e) => {
                  e in s || (s[e] = 50);
                }),
                this.model.set("probabilityMap", s)),
                this.reRender();
            });
        },
        data: function () {
          let e = {};
          var t = this.model.get("probabilityMap") || {};
          return (
            (e.stageList = this.model.get("options") || []), (e.values = t), e
          );
        },
        fetch: function () {
          let t = { probabilityMap: {} };
          return (
            (this.model.get("options") || []).forEach((e) => {
              t.probabilityMap[e] = parseInt(
                this.$el.find('input[data-name="' + e + '"]').val()
              );
            }),
            t
          );
        },
        afterRender: function () {
          this.$el.find("input").on("change", () => {
            this.trigger("change");
          });
        },
      });
    }
  ),
  define(
    "crm:views/notification/items/event-attendee",
    ["views/notification/items/base"],
    function (e) {
      return e.extend({
        messageName: "eventAttendee",
        templateContent: `
            <div class="stream-head-container">
                <div class="pull-left">{{{avatar}}}</div>
                <div class="stream-head-text-container">
                    <span class="text-muted message">{{{message}}}</span>
                </div>
            </div>
            <div class="stream-date-container">
                <span class="text-muted small">{{{createdAt}}}</span>
            </div>
        `,
        setup: function () {
          var e = this.model.get("data") || {};
          (this.userId = e.userId),
            (this.messageData.entityType = this.translateEntityType(
              e.entityType
            )),
            (this.messageData.entity = $("<a>")
              .attr("href", "#" + e.entityType + "/view/" + e.entityId)
              .attr("data-id", e.entityId)
              .attr("data-scope", e.entityType)
              .text(e.entityName)),
            (this.messageData.user = $("<a>")
              .attr("href", "#User/view/" + e.userId)
              .attr("data-id", e.userId)
              .attr("data-scope", "User")
              .text(e.userName)),
            this.createMessage();
        },
      });
    }
  ),
  define(
    "modules/crm/views/meeting/popup-notification",
    ["exports", "views/popup-notification"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        template = "crm:meeting/popup-notification";
        type = "event";
        style = "primary";
        closeButton = !0;
        setup() {
          var e;
          this.notificationData.entityType &&
            ((e = this.getModelFactory().create(
              this.notificationData.entityType,
              (e) => {
                let t = "dateStart";
                "Task" === this.notificationData.entityType && (t = "dateEnd"),
                  (this.dateAttribute = t),
                  e.set(t, this.notificationData[t]),
                  this.createView("dateField", "views/fields/datetime", {
                    model: e,
                    mode: "detail",
                    selector: '.field[data-name="' + t + '"]',
                    defs: { name: t },
                    readOnly: !0,
                  });
              }
            )),
            this.wait(e));
        }
        data() {
          return {
            header: this.translate(
              this.notificationData.entityType,
              "scopeNames"
            ),
            dateAttribute: this.dateAttribute,
            ...super.data(),
          };
        }
        onCancel() {
          Espo.Ajax.postRequest("Activities/action/removePopupNotification", {
            id: this.notificationId,
          });
        }
      }
      e.default = s;
    }
  ),
  define(
    "crm:views/meeting/record/list-expanded",
    ["views/record/list-expanded", "crm:views/meeting/record/list"],
    function (e, t) {
      return e.extend({
        actionSetHeld: function (e) {
          t.prototype.actionSetHeld.call(this, e);
        },
        actionSetNotHeld: function (e) {
          t.prototype.actionSetNotHeld.call(this, e);
        },
      });
    }
  ),
  define(
    "crm:views/meeting/record/edit-small",
    ["views/record/edit"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/meeting/record/detail",
    ["views/record/detail"],
    function (t) {
      return t.extend({
        duplicateAction: !0,
        setup: function () {
          t.prototype.setup.call(this);
        },
        setupActionItems: function () {
          t.prototype.setupActionItems.call(this),
            this.getAcl().checkModel(this.model, "edit") &&
              -1 === ["Held", "Not Held"].indexOf(this.model.get("status")) &&
              this.getAcl().checkField(this.entityType, "status", "edit") &&
              (this.dropdownItemList.push({
                label: "Set Held",
                name: "setHeld",
              }),
              this.dropdownItemList.push({
                label: "Set Not Held",
                name: "setNotHeld",
              }));
        },
        manageAccessEdit: function (e) {
          t.prototype.manageAccessEdit.call(this, e),
            e &&
              (this.getAcl().checkModel(this.model, "edit", !0) ||
                (this.hideActionItem("setHeld"),
                this.hideActionItem("setNotHeld")));
        },
        actionSetHeld: function () {
          this.model.save({ status: "Held" }, { patch: !0 }).then(() => {
            Espo.Ui.success(this.translate("Saved")),
              this.removeButton("setHeld"),
              this.removeButton("setNotHeld");
          });
        },
        actionSetNotHeld: function () {
          this.model.save({ status: "Not Held" }, { patch: !0 }).then(() => {
            Espo.Ui.success(this.translate("Saved")),
              this.removeButton("setHeld"),
              this.removeButton("setNotHeld");
          });
        },
      });
    }
  ),
  define(
    "crm:views/meeting/record/row-actions/default",
    ["views/record/row-actions/view-and-edit"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            e.forEach((e) => {
              (e.data = e.data || {}), (e.data.scope = this.model.entityType);
            }),
            this.options.acl.edit &&
              !~["Held", "Not Held"].indexOf(this.model.get("status")) &&
              (e.push({
                action: "setHeld",
                label: "Set Held",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
              e.push({
                action: "setNotHeld",
                label: "Set Not Held",
                data: { id: this.model.id, scope: this.model.entityType },
              })),
            this.options.acl.delete &&
              e.push({
                action: "quickRemove",
                label: "Remove",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/meeting/record/row-actions/dashlet",
    ["views/record/row-actions/view-and-edit"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            e.forEach((e) => {
              (e.data = e.data || {}), (e.data.scope = this.model.entityType);
            }),
            this.options.acl.edit &&
              !~["Held", "Not Held"].indexOf(this.model.get("status")) &&
              (e.push({
                action: "setHeld",
                label: "Set Held",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
              e.push({
                action: "setNotHeld",
                label: "Set Not Held",
                data: { id: this.model.id, scope: this.model.entityType },
              })),
            this.options.acl.delete &&
              e.push({
                action: "quickRemove",
                label: "Remove",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/meeting/record/panels/scheduler",
    ["views/record/panels/bottom"],
    function (t) {
      return t.extend({
        templateContent:
          '<div class="scheduler-container no-margin">{{{scheduler}}}</div>',
        setup: function () {
          t.prototype.setup.call(this);
          var e =
            this.getMetadata().get([
              "clientDefs",
              this.scope,
              "schedulerView",
            ]) || "crm:views/scheduler/scheduler";
          this.createView("scheduler", e, {
            selector: ".scheduler-container",
            notToRender: !0,
            model: this.model,
          }),
            this.once("after:render", () => {
              this.disabled ||
                (this.getView("scheduler").render(),
                (this.getView("scheduler").notToRender = !1));
            }),
            this.defs.disabled &&
              this.once("show", () => {
                this.getView("scheduler").render(),
                  (this.getView("scheduler").notToRender = !1);
              });
        },
        actionRefresh: function () {
          this.getView("scheduler").reRender();
        },
      });
    }
  ),
  define(
    "crm:views/meeting/record/panels/attendees",
    ["views/record/panels/side"],
    function (e) {
      return e.extend({
        setupFields: function () {
          (this.fieldList = []),
            this.fieldList.push("users"),
            this.getAcl().check("Contact") &&
              !this.getMetadata().get("scopes.Contact.disabled") &&
              this.fieldList.push("contacts"),
            this.getAcl().check("Lead") &&
              !this.getMetadata().get("scopes.Lead.disabled") &&
              this.fieldList.push("leads");
        },
      });
    }
  ),
  define(
    "crm:views/meeting/modals/send-invitations",
    ["views/modal", "collection"],
    function (e, t) {
      return e.extend({
        backdrop: !0,
        templateContent: `
            <div class="margin-bottom">
                <p>{{message}}</p>
            </div>
            <div class="list-container">{{{list}}}</div>
        `,
        data: function () {
          return {
            message: this.translate(
              "sendInvitationsToSelectedAttendees",
              "messages",
              "Meeting"
            ),
          };
        },
        setup: function () {
          e.prototype.setup.call(this),
            (this.shortcutKeys = {}),
            (this.shortcutKeys["Control+Enter"] = (e) => {
              this.hasAvailableActionItem("send") &&
                (e.preventDefault(), this.actionSend());
            }),
            (this.$header = $("<span>").append(
              $("<span>").text(
                this.translate(this.model.entityType, "scopeNames")
              ),
              ' <span class="chevron-right"></span> ',
              $("<span>").text(this.model.get("name")),
              ' <span class="chevron-right"></span> ',
              $("<span>").text(
                this.translate("Send Invitations", "labels", "Meeting")
              )
            )),
            this.addButton({
              label: "Send",
              name: "send",
              style: "danger",
              disabled: !0,
            }),
            this.addButton({ label: "Cancel", name: "cancel" }),
            (this.collection = new t()),
            (this.collection.url =
              this.model.entityType + `/${this.model.id}/attendees`),
            this.wait(
              this.collection
                .fetch()
                .then(
                  () => (
                    Espo.Utils.clone(this.collection.models).forEach((e) => {
                      (e.entityType = e.get("_scope")),
                        e.get("emailAddress") || this.collection.remove(e.id);
                    }),
                    this.createView("list", "views/record/list", {
                      selector: ".list-container",
                      collection: this.collection,
                      rowActionsDisabled: !0,
                      massActionsDisabled: !0,
                      checkAllResultDisabled: !0,
                      selectable: !0,
                      buttonsDisabled: !0,
                      listLayout: [
                        {
                          name: "name",
                          customLabel: this.translate("name", "fields"),
                          notSortable: !0,
                        },
                        {
                          name: "acceptanceStatus",
                          width: 40,
                          customLabel: this.translate(
                            "acceptanceStatus",
                            "fields",
                            "Meeting"
                          ),
                          notSortable: !0,
                          view: "views/fields/enum",
                          params: {
                            options: this.model.getFieldParam(
                              "acceptanceStatus",
                              "options"
                            ),
                            style: this.model.getFieldParam(
                              "acceptanceStatus",
                              "style"
                            ),
                          },
                        },
                      ],
                    })
                  )
                )
                .then((e) => {
                  this.collection.models
                    .filter((e) => {
                      e = e.get("acceptanceStatus");
                      return !e || "None" === e;
                    })
                    .forEach((e) => {
                      this.getListView().checkRecord(e.id);
                    }),
                    this.listenTo(e, "check", () => this.controlSendButton()),
                    this.controlSendButton();
                })
            );
        },
        controlSendButton: function () {
          this.getListView().checkedList.length
            ? this.enableButton("send")
            : this.disableButton("send");
        },
        getListView: function () {
          return this.getView("list");
        },
        actionSend: function () {
          this.disableButton("send"), Espo.Ui.notify(" ... ");
          var e = this.getListView().checkedList.map((e) => ({
            entityType: this.collection.get(e).entityType,
            id: e,
          }));
          Espo.Ajax.postRequest(
            this.model.entityType + "/action/sendInvitations",
            { id: this.model.id, targets: e }
          )
            .then((e) => {
              e
                ? Espo.Ui.success(this.translate("Sent"))
                : Espo.Ui.warning(
                    this.translate("nothingHasBeenSent", "messages", "Meeting")
                  ),
                this.trigger("sent"),
                this.close();
            })
            .catch(() => {
              this.enableButton("send");
            });
        },
      });
    }
  ),
  define(
    "crm:views/meeting/modals/send-cancellation",
    ["views/modal", "collection"],
    function (e, t) {
      return e.extend({
        backdrop: !0,
        templateContent: `
            <div class="margin-bottom">
                <p>{{message}}</p>
            </div>
            <div class="list-container">{{{list}}}</div>
        `,
        data: function () {
          return {
            message: this.translate(
              "sendCancellationsToSelectedAttendees",
              "messages",
              "Meeting"
            ),
          };
        },
        setup: function () {
          e.prototype.setup.call(this),
            (this.shortcutKeys = {}),
            (this.shortcutKeys["Control+Enter"] = (e) => {
              this.hasAvailableActionItem("send") &&
                (e.preventDefault(), this.actionSend());
            }),
            (this.$header = $("<span>").append(
              $("<span>").text(
                this.translate(this.model.entityType, "scopeNames")
              ),
              ' <span class="chevron-right"></span> ',
              $("<span>").text(this.model.get("name")),
              ' <span class="chevron-right"></span> ',
              $("<span>").text(
                this.translate("Send Cancellation", "labels", "Meeting")
              )
            )),
            this.addButton({
              label: "Send",
              name: "send",
              style: "danger",
              disabled: !0,
            }),
            this.addButton({ label: "Cancel", name: "cancel" }),
            (this.collection = new t()),
            (this.collection.url =
              this.model.entityType + `/${this.model.id}/attendees`),
            this.wait(
              this.collection
                .fetch()
                .then(
                  () => (
                    Espo.Utils.clone(this.collection.models).forEach((e) => {
                      (e.entityType = e.get("_scope")),
                        e.get("emailAddress") || this.collection.remove(e.id);
                    }),
                    this.createView("list", "views/record/list", {
                      selector: ".list-container",
                      collection: this.collection,
                      rowActionsDisabled: !0,
                      massActionsDisabled: !0,
                      checkAllResultDisabled: !0,
                      selectable: !0,
                      buttonsDisabled: !0,
                      listLayout: [
                        {
                          name: "name",
                          customLabel: this.translate("name", "fields"),
                          notSortable: !0,
                        },
                        {
                          name: "acceptanceStatus",
                          width: 40,
                          customLabel: this.translate(
                            "acceptanceStatus",
                            "fields",
                            "Meeting"
                          ),
                          notSortable: !0,
                          view: "views/fields/enum",
                          params: {
                            options: this.model.getFieldParam(
                              "acceptanceStatus",
                              "options"
                            ),
                            style: this.model.getFieldParam(
                              "acceptanceStatus",
                              "style"
                            ),
                          },
                        },
                      ],
                    })
                  )
                )
                .then((e) => {
                  this.collection.models
                    .filter(
                      (e) =>
                        e.id !== this.getUser().id || "User" !== e.entityType
                    )
                    .forEach((e) => {
                      this.getListView().checkRecord(e.id);
                    }),
                    this.listenTo(e, "check", () => this.controlSendButton()),
                    this.controlSendButton();
                })
            );
        },
        controlSendButton: function () {
          this.getListView().checkedList.length
            ? this.enableButton("send")
            : this.disableButton("send");
        },
        getListView: function () {
          return this.getView("list");
        },
        actionSend: function () {
          this.disableButton("send"), Espo.Ui.notify(" ... ");
          var e = this.getListView().checkedList.map((e) => ({
            entityType: this.collection.get(e).entityType,
            id: e,
          }));
          Espo.Ajax.postRequest(
            this.model.entityType + "/action/sendCancellation",
            { id: this.model.id, targets: e }
          )
            .then((e) => {
              e
                ? Espo.Ui.success(this.translate("Sent"))
                : Espo.Ui.warning(
                    this.translate("nothingHasBeenSent", "messages", "Meeting")
                  ),
                this.trigger("sent"),
                this.close();
            })
            .catch(() => {
              this.enableButton("send");
            });
        },
      });
    }
  ),
  define(
    "crm:views/meeting/modals/detail",
    ["views/modals/detail", "lib!moment"],
    function (t, s) {
      return t.extend({
        duplicateAction: !0,
        setupAfterModelCreated: function () {
          t.prototype.setupAfterModelCreated.call(this);
          var e = this.getAcceptanceButtonData();
          this.addButton(
            {
              name: "setAcceptanceStatus",
              html: e.html,
              hidden: this.hasAcceptanceStatusButton(),
              style: e.style,
              className: "btn-text",
              pullLeft: !0,
            },
            "cancel"
          ),
            ~this.getAcl()
              .getScopeForbiddenFieldList(this.model.entityType)
              .indexOf("status") ||
              (this.addDropdownItem({
                name: "setHeld",
                text: this.translate(
                  "Set Held",
                  "labels",
                  this.model.entityType
                ),
                hidden: !0,
              }),
              this.addDropdownItem({
                name: "setNotHeld",
                text: this.translate(
                  "Set Not Held",
                  "labels",
                  this.model.entityType
                ),
                hidden: !0,
              })),
            this.addDropdownItem({
              name: "sendInvitations",
              text: this.translate("Send Invitations", "labels", "Meeting"),
              hidden: !this.isSendInvitationsToBeDisplayed(),
            }),
            this.initAcceptanceStatus(),
            this.on("switch-model", (e, t) => {
              this.stopListening(t, "sync"), this.initAcceptanceStatus();
            }),
            this.on("after:save", () => {
              this.hasAcceptanceStatusButton()
                ? this.showAcceptanceButton()
                : this.hideAcceptanceButton(),
                this.isSendInvitationsToBeDisplayed()
                  ? this.showActionItem("sendInvitations")
                  : this.hideActionItem("sendInvitations");
            }),
            this.listenTo(this.model, "sync", () => {
              this.isSendInvitationsToBeDisplayed()
                ? this.showActionItem("sendInvitations")
                : this.hideActionItem("sendInvitations");
            }),
            this.listenTo(this.model, "after:save", () => {
              this.isSendInvitationsToBeDisplayed()
                ? this.showActionItem("sendInvitations")
                : this.hideActionItem("sendInvitations");
            });
        },
        controlRecordButtonsVisibility: function () {
          t.prototype.controlRecordButtonsVisibility.call(this),
            this.controlStatusActionVisibility();
        },
        controlStatusActionVisibility: function () {
          this.getAcl().check(this.model, "edit") &&
          !~["Held", "Not Held"].indexOf(this.model.get("status"))
            ? (this.showActionItem("setHeld"),
              this.showActionItem("setNotHeld"))
            : (this.hideActionItem("setHeld"),
              this.hideActionItem("setNotHeld"));
        },
        hasSetStatusButton: function () {},
        initAcceptanceStatus: function () {
          this.hasAcceptanceStatusButton()
            ? this.showAcceptanceButton()
            : this.hideAcceptanceButton(),
            this.listenTo(this.model, "sync", () => {
              this.hasAcceptanceStatusButton()
                ? this.showAcceptanceButton()
                : this.hideAcceptanceButton();
            });
        },
        getAcceptanceButtonData: function () {
          var e,
            t = this.model.getLinkMultipleColumn(
              "users",
              "status",
              this.getUser().id
            );
          let i,
            s = "default",
            a = null,
            n =
              (t && "None" !== t
                ? ((i = this.getLanguage().translateOption(
                    t,
                    "acceptanceStatus",
                    this.model.entityType
                  )),
                  (s = this.getMetadata().get([
                    "entityDefs",
                    this.model.entityType,
                    "fields",
                    "acceptanceStatus",
                    "style",
                    t,
                  ])) &&
                    ((e = {
                      success: "fas fa-check-circle",
                      danger: "fas fa-times-circle",
                      warning: "fas fa-question-circle",
                    }[s]),
                    (a = $("<span>")
                      .addClass(e)
                      .addClass("text-" + s)
                      .get(0).outerHTML)))
                : (i =
                    void 0 !== t
                      ? this.translate("Acceptance", "labels", "Meeting")
                      : " "),
              this.getHelper().escapeString(i));
          return a && (n = a + " " + n), { style: s, text: i, html: n };
        },
        showAcceptanceButton: function () {
          if ((this.showActionItem("setAcceptanceStatus"), this.isRendered())) {
            var t = this.getAcceptanceButtonData();
            let e = this.$el.find(
              '.modal-footer [data-name="setAcceptanceStatus"]'
            );
            e.html(t.html),
              e.removeClass("btn-default"),
              e.removeClass("btn-success"),
              e.removeClass("btn-warning"),
              e.removeClass("btn-info"),
              e.removeClass("btn-primary"),
              e.removeClass("btn-danger"),
              e.addClass("btn-" + t.style);
          } else this.once("after:render", this.showAcceptanceButton, this);
        },
        hideAcceptanceButton: function () {
          this.hideActionItem("setAcceptanceStatus");
        },
        hasAcceptanceStatusButton: function () {
          return (
            !!this.model.has("status") &&
            !!this.model.has("usersIds") &&
            !~["Held", "Not Held"].indexOf(this.model.get("status")) &&
            !!~this.model
              .getLinkMultipleIdList("users")
              .indexOf(this.getUser().id)
          );
        },
        actionSetAcceptanceStatus: function () {
          this.createView(
            "dialog",
            "crm:views/meeting/modals/acceptance-status",
            { model: this.model },
            (e) => {
              e.render(),
                this.listenTo(e, "set-status", (e) => {
                  this.hideAcceptanceButton(),
                    Espo.Ajax.postRequest(
                      this.model.entityType + "/action/setAcceptanceStatus",
                      { id: this.model.id, status: e }
                    ).then(() => {
                      this.model.fetch().then(() => {
                        setTimeout(() => {
                          this.$el
                            .find('button[data-name="setAcceptanceStatus"]')
                            .focus();
                        }, 50);
                      });
                    });
                });
            }
          );
        },
        actionSetHeld: function () {
          this.model.save({ status: "Held" }),
            this.trigger("after:save", this.model);
        },
        actionSetNotHeld: function () {
          this.model.save({ status: "Not Held" }),
            this.trigger("after:save", this.model);
        },
        isSendInvitationsToBeDisplayed: function () {
          if (~["Held", "Not Held"].indexOf(this.model.get("status")))
            return !1;
          var e = this.model.get("dateEnd");
          if (e && this.getDateTime().toMoment(e).isBefore(s.now())) return !1;
          if (!this.getAcl().checkModel(this.model, "edit")) return !1;
          var e = this.model.getLinkMultipleIdList("users"),
            t = this.model.getLinkMultipleIdList("contacts"),
            i = this.model.getLinkMultipleIdList("leads");
          return !!(t.length || i.length || e.length);
        },
        actionSendInvitations: function () {
          Espo.Ui.notify(" ... "),
            this.createView(
              "dialog",
              "crm:views/meeting/modals/send-invitations",
              { model: this.model }
            ).then((e) => {
              Espo.Ui.notify(!1),
                e.render(),
                this.listenToOnce(e, "sent", () => this.model.fetch());
            });
        },
      });
    }
  ),
  define(
    "crm:views/meeting/modals/acceptance-status",
    ["views/modal"],
    function (t) {
      return t.extend({
        backdrop: !0,
        templateContent: `
            <div class="margin-bottom">
            <p>{{viewObject.message}}</p>
            </div>
            <div>
                {{#each viewObject.statusDataList}}
                <div class="margin-bottom">
                    <div>
                        <button
                            class="action btn btn-{{style}} btn-x-wide"
                            type="button"
                            data-action="setStatus"
                            data-status="{{name}}"
                        >
                        {{label}}
                        </button>
                        {{#if selected}}<span class="check-icon fas fa-check" style="vertical-align: middle; margin: 0 10px;"></span>{{/if}}
                    </div>
                </div>
                {{/each}}
            </div>
        `,
        setup: function () {
          t.prototype.setup.call(this),
            (this.$header = $("<span>").append(
              $("<span>").text(
                this.translate(this.model.entityType, "scopeNames")
              ),
              ' <span class="chevron-right"></span> ',
              $("<span>").text(this.model.get("name")),
              ' <span class="chevron-right"></span> ',
              $("<span>").text(
                this.translate("Acceptance", "labels", "Meeting")
              )
            ));
          let e =
            this.getMetadata().get([
              "entityDefs",
              this.model.entityType,
              "fields",
              "acceptanceStatus",
              "options",
            ]) || [];
          (this.statusDataList = []),
            e
              .filter((e) => "None" !== e)
              .forEach((e) => {
                e = {
                  name: e,
                  style:
                    this.getMetadata().get([
                      "entityDefs",
                      this.model.entityType,
                      "fields",
                      "acceptanceStatus",
                      "style",
                      e,
                    ]) || "default",
                  label: this.getLanguage().translateOption(
                    e,
                    "acceptanceStatus",
                    this.model.entityType
                  ),
                  selected:
                    this.model.getLinkMultipleColumn(
                      "users",
                      "status",
                      this.getUser().id
                    ) === e,
                };
                this.statusDataList.push(e);
              }),
            (this.message = this.translate(
              "selectAcceptanceStatus",
              "messages",
              "Meeting"
            ));
        },
        actionSetStatus: function (e) {
          this.trigger("set-status", e.status), this.close();
        },
      });
    }
  ),
  define(
    "crm:views/meeting/fields/users",
    ["crm:views/meeting/fields/attendees"],
    function (e) {
      return e.extend({
        selectPrimaryFilterName: "active",
        init: function () {
          (this.assignmentPermission = this.getAcl().getPermissionLevel(
            "assignmentPermission"
          )),
            "no" === this.assignmentPermission && (this.readOnly = !0),
            e.prototype.init.call(this);
        },
        getSelectBoolFilterList: function () {
          if ("team" === this.assignmentPermission) return ["onlyMyTeam"];
        },
        getIconHtml: function (e) {
          let t = this.getHelper().getAvatarHtml(e, "small", 14, "avatar-link");
          return t && (t += " "), t;
        },
      });
    }
  ),
  define(
    "crm:views/meeting/fields/reminders",
    ["views/fields/base", "ui/select", "lib!moment"],
    function (e, l, i) {
      return e.extend({
        dateField: "dateStart",
        detailTemplate: "crm:meeting/fields/reminders/detail",
        listTemplate: "crm:meeting/fields/reminders/detail",
        editTemplate: "crm:meeting/fields/reminders/edit",
        events: {
          'click [data-action="addReminder"]': function () {
            var e = {
              type: this.getMetadata().get(
                "entityDefs.Reminder.fields.type.default"
              ),
              seconds:
                this.getMetadata().get(
                  "entityDefs.Reminder.fields.seconds.default"
                ) || 0,
            };
            this.reminderList.push(e),
              this.addItemHtml(e),
              this.trigger("change"),
              this.focusOnButton();
          },
          'click [data-action="removeReminder"]': function (e) {
            let t = $(e.currentTarget).closest(".reminder");
            e = t.index();
            t.remove(), this.reminderList.splice(e, 1), this.focusOnButton();
          },
        },
        getAttributeList: function () {
          return [this.name];
        },
        setup: function () {
          this.model.isNew() &&
          !this.model.get(this.name) &&
          "Preferences" !== this.model.entityType
            ? (this.reminderList =
                this.getPreferences().get("defaultReminders") || [])
            : (this.reminderList = this.model.get(this.name) || []),
            (this.reminderList = Espo.Utils.cloneDeep(this.reminderList)),
            this.listenTo(this.model, "change:" + this.name, () => {
              this.reminderList = Espo.Utils.cloneDeep(
                this.model.get(this.name) || []
              );
            }),
            (this.typeList = Espo.Utils.clone(
              this.getMetadata().get(
                "entityDefs.Reminder.fields.type.options"
              ) || []
            )),
            (this.secondsList = Espo.Utils.clone(
              this.getMetadata().get(
                "entityDefs.Reminder.fields.seconds.options"
              ) || []
            )),
            (this.dateField =
              this.model.getFieldParam(this.name, "dateField") ||
              this.dateField),
            this.listenTo(this.model, "change:" + this.dateField, (e, t, i) => {
              this.isEditMode() && this.reRender();
            });
        },
        afterRender: function () {
          this.isEditMode() &&
            ((this.$container = this.$el.find(".reminders-container")),
            this.reminderList.forEach((e) => {
              this.addItemHtml(e);
            }));
        },
        focusOnButton: function () {
          this.$el
            .find('button[data-action="addReminder"]')
            .get(0)
            .focus({ preventScroll: !0 });
        },
        updateType: function (e, t) {
          (this.reminderList[t].type = e), this.trigger("change");
        },
        updateSeconds: function (e, t) {
          (this.reminderList[t].seconds = e), this.trigger("change");
        },
        addItemHtml: function (t) {
          let e = $("<div>").addClass("input-group").addClass("reminder"),
            i = $("<select>")
              .attr("name", "type")
              .attr("data-name", "type")
              .addClass("form-control"),
            s =
              (this.typeList.forEach((e) => {
                e = $("<option>")
                  .attr("value", e)
                  .text(this.getLanguage().translateOption(e, "reminderTypes"));
                i.append(e);
              }),
              i.val(t.type).addClass("radius-left"),
              i.on("change", () => {
                this.updateType(i.val(), i.closest(".reminder").index());
              }),
              $("<select>")
                .attr("name", "seconds")
                .attr("data-name", "seconds")
                .addClass("form-control radius-right")),
            a = this.model.get(this.dateField)
              ? this.getDateTime().toMoment(this.model.get(this.dateField))
              : null,
            n = Espo.Utils.clone(this.secondsList);
          n.includes(t.seconds) || n.push(t.seconds),
            n
              .filter((e) => e === t.seconds || !a || this.isBefore(e, a))
              .sort((e, t) => e - t)
              .forEach((e) => {
                e = $("<option>")
                  .attr("value", e)
                  .text(this.stringifySeconds(e));
                s.append(e);
              }),
            s.val(t.seconds),
            s.on("change", () => {
              var e = parseInt(s.val()),
                t = s.closest(".reminder").index();
              this.updateSeconds(e, t);
            });
          var o = $("<button>")
            .addClass("btn")
            .addClass("btn-link")
            .css("margin-left", "5px")
            .attr("type", "button")
            .attr("data-action", "removeReminder")
            .html('<span class="fas fa-times"></span>');
          e
            .append($('<div class="input-group-item">').append(i))
            .append($('<div class="input-group-item">').append(s))
            .append($('<div class="input-group-btn">').append(o)),
            this.$container.append(e),
            l.init(i, {}),
            l.init(s, {
              sortBy: "$score",
              sortDirection: "desc",
              score: (e, t) => {
                (t = parseInt(t.value)), (e = parseInt(e));
                if (isNaN(e)) return 0;
                var i = Number.MAX_SAFE_INTEGER - t;
                return (0 === e && 0 === t) ||
                  60 * e === t ||
                  60 * e * 60 === t ||
                  60 * e * 60 * 24 === t
                  ? i
                  : 0;
              },
              load: (i, s) => {
                i = parseInt(i);
                if (!(isNaN(i) || i < 0 || 59 < i)) {
                  let t = [],
                    e = 60 * i;
                  if (this.isBefore(e, a)) {
                    if (
                      (t.push({
                        value: e.toString(),
                        text: this.stringifySeconds(e),
                      }),
                      i <= 24)
                    ) {
                      let e = 3600 * i;
                      this.isBefore(e, a) &&
                        t.push({
                          value: e.toString(),
                          text: this.stringifySeconds(e),
                        });
                    }
                    if (i <= 30) {
                      let e = 3600 * i * 24;
                      this.isBefore(e, a) &&
                        t.push({
                          value: e.toString(),
                          text: this.stringifySeconds(e),
                        });
                    }
                    s(t);
                  }
                }
              },
            });
        },
        isBefore: function (e, t) {
          return i.utc().add(e, "seconds").isBefore(t);
        },
        stringifySeconds: function (e) {
          if (!e) return this.translate("on time", "labels", "Meeting");
          var t = Math.floor(e / 86400),
            i = ((e %= 86400), Math.floor(e / 3600)),
            s = ((e %= 3600), Math.floor(e / 60)),
            e = e % 60;
          let a = [];
          return (
            t &&
              a.push(
                t + "" + this.getLanguage().translate("d", "durationUnits")
              ),
            i &&
              a.push(
                i + "" + this.getLanguage().translate("h", "durationUnits")
              ),
            s &&
              a.push(
                s + "" + this.getLanguage().translate("m", "durationUnits")
              ),
            e &&
              a.push(
                e + "" + this.getLanguage().translate("s", "durationUnits")
              ),
            a.join(" ") + " " + this.translate("before", "labels", "Meeting")
          );
        },
        convertSeconds: function (e) {
          return e;
        },
        getDetailItemHtml: function (e) {
          return $("<div>")
            .append(
              $("<span>").text(
                this.getLanguage().translateOption(e.type, "reminderTypes")
              ),
              " ",
              $("<span>").text(this.stringifySeconds(e.seconds))
            )
            .get(0).outerHTML;
        },
        getValueForDisplay: function () {
          if (this.isDetailMode() || this.isListMode()) {
            let t = "";
            return (
              this.reminderList.forEach((e) => {
                t += this.getDetailItemHtml(e);
              }),
              t
            );
          }
        },
        fetch: function () {
          let e = {};
          return (e[this.name] = Espo.Utils.cloneDeep(this.reminderList)), e;
        },
      });
    }
  ),
  define(
    "crm:views/meeting/fields/date-start",
    ["views/fields/datetime-optional"],
    function (t) {
      return t.extend({
        emptyTimeInInlineEditDisabled: !0,
        setup: function () {
          t.prototype.setup.call(this),
            (this.noneOption = this.translate("All-Day", "labels", "Meeting"));
        },
        fetch: function () {
          var e = t.prototype.fetch.call(this);
          return e[this.nameDate] ? (e.isAllDay = !0) : (e.isAllDay = !1), e;
        },
        afterRender: function () {
          t.prototype.afterRender.call(this),
            this.isEditMode() && this.controlTimePartVisibility();
        },
        controlTimePartVisibility: function () {
          this.isEditMode() &&
            this.isInlineEditMode() &&
            (this.model.get("isAllDay")
              ? (this.$time.addClass("hidden"),
                this.$el.find(".time-picker-btn").addClass("hidden"))
              : (this.$time.removeClass("hidden"),
                this.$el.find(".time-picker-btn").removeClass("hidden")));
        },
      });
    }
  ),
  define(
    "crm:views/meeting/fields/date-end",
    ["views/fields/datetime-optional"],
    function (e) {
      return e.extend({
        validateAfterAllowSameDay: !0,
        emptyTimeInInlineEditDisabled: !0,
        noneOptionIsHidden: !0,
        isEnd: !0,
        setup: function () {
          e.prototype.setup.call(this),
            (this.isAllDayValue = this.model.get("isAllDay")),
            this.listenTo(this.model, "change:isAllDay", (e, t, i) => {
              if (i.ui && this.isEditMode())
                if (void 0 !== this.isAllDayValue || t) {
                  if ((this.isAllDayValue = t)) this.$time.val(this.noneOption);
                  else {
                    let e = this.model.get("dateStart"),
                      t =
                        ((e = e || this.getDateTime().getNow(5)),
                        this.getDateTime().toMoment(e));
                    (i = (e = t.format(
                      this.getDateTime().getDateTimeFormat()
                    )).indexOf(" ")),
                      (i = e.substring(i + 1));
                    this.model.get("dateEnd") && this.$time.val(i);
                  }
                  this.trigger("change"), this.controlTimePartVisibility();
                } else this.isAllDayValue = t;
            });
        },
        afterRender: function () {
          e.prototype.afterRender.call(this),
            this.isEditMode() && this.controlTimePartVisibility();
        },
        controlTimePartVisibility: function () {
          if (this.isEditMode()) {
            if (this.model.get("isAllDay"))
              return (
                this.$time.addClass("hidden"),
                void this.$el.find(".time-picker-btn").addClass("hidden")
              );
            this.$time.removeClass("hidden"),
              this.$el.find(".time-picker-btn").removeClass("hidden");
          }
        },
      });
    }
  ),
  define(
    "modules/crm/views/meeting/fields/acceptance-status",
    ["exports", "views/fields/enum"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        searchTypeList = ["anyOf", "noneOf"];
        fetchSearch() {
          let e = super.fetchSearch();
          return (
            e &&
              "noneOf" === e.data.type &&
              e.value &&
              1 < e.value.length &&
              (e.value = [e.value[0]]),
            e
          );
        }
      }
      e.default = s;
    }
  ),
  define("crm:views/mass-email/detail", ["views/detail"], function (e) {
    return e.extend({
      setup: function () {
        e.prototype.setup.call(this),
          ~["Draft", "Pending"].indexOf(this.model.get("status")) &&
            this.getAcl().checkModel(this.model, "edit") &&
            this.menu.buttons.push({
              label: "Send Test",
              action: "sendTest",
              acl: "edit",
            });
      },
      actionSendTest: function () {
        this.createView(
          "sendTest",
          "crm:views/mass-email/modals/send-test",
          { model: this.model },
          function (e) {
            e.render();
          },
          this
        );
      },
    });
  }),
  define(
    "crm:views/mass-email/record/list-for-campaign",
    ["views/record/list"],
    function (e) {
      return e.extend({
        actionSendTest: function (e) {
          (e = e.id), (e = this.collection.get(e));
          e &&
            this.createView(
              "sendTest",
              "crm:views/mass-email/modals/send-test",
              { model: e },
              (e) => {
                e.render();
              }
            );
        },
      });
    }
  ),
  define(
    "crm:views/mass-email/record/edit-small",
    ["views/record/edit-small", "crm:views/mass-email/record/edit"],
    function (e, t) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            t.prototype.initFieldsControl.call(this);
        },
      });
    }
  ),
  define(
    "crm:views/mass-email/record/detail",
    ["views/record/detail"],
    function (e) {
      return e.extend({
        duplicateAction: !0,
        bottomView: "crm:views/mass-email/record/detail-bottom",
      });
    }
  ),
  define(
    "crm:views/mass-email/record/detail-bottom",
    ["views/record/detail-bottom"],
    function (e) {
      return e.extend({
        setupPanels: function () {
          e.prototype.setupPanels.call(this),
            this.panelList.unshift({
              name: "queueItems",
              label: this.translate("queueItems", "links", "MassEmail"),
              view: "views/record/panels/relationship",
              select: !1,
              create: !1,
              layout: "listForMassEmail",
              rowActionsView: "views/record/row-actions/empty",
              filterList: ["all", "pending", "sent", "failed"],
            });
        },
        afterRender: function () {
          e.prototype.setupPanels.call(this);
        },
      });
    }
  ),
  define(
    "crm:views/mass-email/record/row-actions/for-campaign",
    ["views/record/row-actions/relationship-no-unlink"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            this.options.acl.edit &&
              !~["Complete"].indexOf(this.model.get("status")) &&
              e.unshift({
                action: "sendTest",
                label: "Send Test",
                data: { id: this.model.id },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/mass-email/modals/send-test",
    ["views/modal", "model"],
    function (i, s) {
      return i.extend({
        scope: "MassEmail",
        template: "crm:mass-email/modals/send-test",
        setup: function () {
          i.prototype.setup.call(this),
            (this.headerText = this.translate(
              "Send Test",
              "labels",
              "MassEmail"
            ));
          var e = new s(),
            t = (e.set("usersIds", [this.getUser().id]), {});
          (t[this.getUser().id] = this.getUser().get("name")),
            e.set("usersNames", t),
            this.createView("users", "views/fields/link-multiple", {
              model: e,
              selector: '.field[data-name="users"]',
              foreignScope: "User",
              defs: { name: "users", params: {} },
              mode: "edit",
            }),
            this.createView("contacts", "views/fields/link-multiple", {
              model: e,
              selector: '.field[data-name="contacts"]',
              foreignScope: "Contact",
              defs: { name: "contacts", params: {} },
              mode: "edit",
            }),
            this.createView("leads", "views/fields/link-multiple", {
              model: e,
              selector: '.field[data-name="leads"]',
              foreignScope: "Lead",
              defs: { name: "leads", params: {} },
              mode: "edit",
            }),
            this.createView("accounts", "views/fields/link-multiple", {
              model: e,
              selector: '.field[data-name="accounts"]',
              foreignScope: "Account",
              defs: { name: "accounts", params: {} },
              mode: "edit",
            }),
            this.buttonList.push({
              name: "sendTest",
              label: "Send Test",
              style: "danger",
            }),
            this.buttonList.push({ name: "cancel", label: "Cancel" });
        },
        actionSendTest: function () {
          var t = [];
          this.getView("users")
            .fetch()
            .usersIds.forEach(function (e) {
              t.push({ id: e, type: "User" });
            }),
            this.getView("contacts")
              .fetch()
              .contactsIds.forEach(function (e) {
                t.push({ id: e, type: "Contact" });
              }),
            this.getView("leads")
              .fetch()
              .leadsIds.forEach(function (e) {
                t.push({ id: e, type: "Lead" });
              }),
            this.getView("accounts")
              .fetch()
              .accountsIds.forEach(function (e) {
                t.push({ id: e, type: "Account" });
              }),
            0 !== t.length
              ? (this.disableButton("sendTest"),
                Espo.Ajax.postRequest("MassEmail/action/sendTest", {
                  id: this.model.id,
                  targetList: t,
                })
                  .then(() => {
                    Espo.Ui.success(
                      this.translate("testSent", "messages", "MassEmail")
                    ),
                      this.close();
                  })
                  .catch(() => {
                    this.enableButton("sendTest");
                  }))
              : alert(
                  this.translate(
                    "selectAtLeastOneTarget",
                    "messages",
                    "MassEmail"
                  )
                );
        },
      });
    }
  ),
  define(
    "crm:views/mass-email/fields/smtp-account",
    ["views/lead-capture/fields/smtp-account"],
    function (e) {
      return e.extend({ dataUrl: "MassEmail/action/smtpAccountDataList" });
    }
  ),
  define(
    "crm:views/mass-email/fields/from-address",
    ["views/fields/varchar"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            this.model.isNew() &&
              !this.model.has("fromAddress") &&
              this.model.set(
                "fromAddress",
                this.getConfig().get("outboundEmailFromAddress")
              ),
            this.model.isNew() &&
              !this.model.has("fromName") &&
              this.model.set(
                "fromName",
                this.getConfig().get("outboundEmailFromName")
              );
        },
      });
    }
  ),
  define(
    "crm:views/mass-email/fields/email-template",
    ["views/fields/link"],
    function (e) {
      return e.extend({
        getCreateAttributes: function () {
          return { oneOff: !0 };
        },
      });
    }
  ),
  define("crm:views/lead/detail", ["views/detail"], function (e) {
    return e.extend({
      setup: function () {
        e.prototype.setup.call(this),
          this.addMenuItem("buttons", {
            name: "convert",
            action: "convert",
            label: "Convert",
            acl: "edit",
            hidden: !this.isConvertable(),
            onClick: () => this.actionConvert(),
          }),
          this.model.has("status") ||
            this.listenToOnce(this.model, "sync", () => {
              this.isConvertable() && this.showHeaderActionItem("convert");
            });
      },
      isConvertable: function () {
        return (
          !["Converted", "Dead"].includes(this.model.get("status")) ||
          !this.model.has("status")
        );
      },
      actionConvert: function () {
        this.getRouter().navigate(
          this.model.entityType + "/convert/" + this.model.id,
          { trigger: !0 }
        );
      },
    });
  }),
  define("crm:views/lead/convert", ["view"], function (e) {
    return e.extend({
      template: "crm:lead/convert",
      data: function () {
        return { scopeList: this.scopeList, scope: this.model.entityType };
      },
      events: {
        "change input.check-scope": function (e) {
          var t = $(e.currentTarget).data("scope"),
            t = this.$el.find(".edit-container-" + Espo.Utils.toDom(t));
          e.currentTarget.checked ? t.removeClass("hide") : t.addClass("hide");
        },
        'click button[data-action="convert"]': function (e) {
          this.convert();
        },
        'click button[data-action="cancel"]': function (e) {
          this.getRouter().navigate("#Lead/view/" + this.id, { trigger: !0 });
        },
      },
      setup: function () {
        this.wait(!0),
          (this.id = this.options.id),
          Espo.Ui.notify(" ... "),
          this.getModelFactory().create("Lead", (e) => {
            ((this.model = e).id = this.id),
              this.listenToOnce(e, "sync", () => {
                this.build();
              }),
              e.fetch();
          });
      },
      build: function () {
        var a = (this.scopeList = []);
        (
          this.getMetadata().get("entityDefs.Lead.convertEntityList") || []
        ).forEach((e) => {
          ("Account" === e && this.getConfig().get("b2cMode")) ||
            this.getMetadata().get(["scopes", e, "disabled"]) ||
            (this.getAcl().check(e, "edit") && a.push(e));
        });
        let n = 0;
        a.length &&
          Espo.Ajax.postRequest("Lead/action/getConvertAttributes", {
            id: this.model.id,
          }).then((s) => {
            a.forEach((i) => {
              this.getModelFactory().create(i, (e) => {
                e.populateDefaults(), e.set(s[i] || {}, { silent: !0 });
                var t =
                  this.getMetadata().get([
                    "clientDefs",
                    i,
                    "recordViews",
                    "edit",
                  ]) || "views/record/edit";
                this.createView(
                  i,
                  t,
                  {
                    model: e,
                    fullSelector:
                      "#main .edit-container-" + Espo.Utils.toDom(i),
                    buttonsPosition: !1,
                    buttonsDisabled: !0,
                    layoutName: "detailConvert",
                    exit: () => {},
                  },
                  (e) => {
                    ++n === a.length && (this.wait(!1), Espo.Ui.notify(!1));
                  }
                );
              });
            });
          }),
          0 === a.length && this.wait(!1);
      },
      convert: function () {
        let s = [];
        if (
          (this.scopeList.forEach((e) => {
            var t = this.$el.find('input[data-scope="' + e + '"]').get(0);
            t && t.checked && s.push(e);
          }),
          0 !== s.length)
        ) {
          let i = (this.getRouter().confirmLeaveOut = !1),
            t =
              (s.forEach((e) => {
                let t = this.getView(e);
                t.model.set(t.fetch()), (i = t.validate() || i);
              }),
              { id: this.model.id, records: {} });
          s.forEach((e) => {
            t.records[e] = this.getView(e).model.attributes;
          });
          var a = (i) => {
            this.$el.find('[data-action="convert"]').addClass("disabled"),
              Espo.Ui.notify(" ... "),
              Espo.Ajax.postRequest("Lead/action/convert", i)
                .then(() => {
                  (this.getRouter().confirmLeaveOut = !1),
                    this.getRouter().navigate("#Lead/view/" + this.model.id, {
                      trigger: !0,
                    }),
                    this.notify("Converted", "success");
                })
                .catch((t) => {
                  if (
                    (Espo.Ui.notify(!1),
                    this.$el
                      .find('[data-action="convert"]')
                      .removeClass("disabled"),
                    409 === t.status &&
                      "duplicate" === t.getResponseHeader("X-Status-Reason"))
                  ) {
                    let e = null;
                    try {
                      e = JSON.parse(t.responseText);
                    } catch (e) {
                      return void console.error(
                        "Could not parse response header."
                      );
                    }
                    (t.errorIsHandled = !0),
                      this.createView(
                        "duplicate",
                        "views/modals/duplicate",
                        { duplicates: e },
                        (e) => {
                          e.render(),
                            this.listenToOnce(e, "save", () => {
                              (i.skipDuplicateCheck = !0), a(i);
                            });
                        }
                      );
                  }
                });
          };
          i ? this.notify("Not Valid", "error") : a(t);
        } else this.notify("Select one or more checkboxes", "error");
      },
    });
  }),
  define("crm:views/lead/record/detail", ["views/record/detail"], function (e) {
    return e.extend({
      selfAssignAction: !0,
      sideView: "crm:views/lead/record/detail-side",
      setup: function () {
        e.prototype.setup.call(this);
      },
      getSelfAssignAttributes: function () {
        if (
          "New" === this.model.get("status") &&
          ~(
            this.getMetadata().get([
              "entityDefs",
              "Lead",
              "fields",
              "status",
              "options",
            ]) || []
          ).indexOf("Assigned")
        )
          return { status: "Assigned" };
      },
    });
  }),
  define(
    "crm:views/lead/record/detail-side",
    ["views/record/detail-side"],
    function (e) {
      return e.extend({ setupPanels: function () {} });
    }
  ),
  define(
    "crm:views/lead/record/panels/converted-to",
    ["views/record/panels/side"],
    function (e) {
      return e.extend({
        setupFields: function () {
          (this.fieldList = []),
            this.getAcl().check("Account") &&
              !this.getMetadata().get("scopes.Account.disabled") &&
              this.fieldList.push("createdAccount"),
            this.getAcl().check("Contact") &&
              !this.getMetadata().get("scopes.Contact.disabled") &&
              this.fieldList.push("createdContact"),
            this.getAcl().check("Opportunity") &&
              !this.getMetadata().get("scopes.Opportunity.disabled") &&
              this.fieldList.push("createdOpportunity");
        },
      });
    }
  ),
  define("crm:views/lead/fields/industry", ["views/fields/enum"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/lead/fields/created-opportunity",
    ["views/fields/link"],
    function (e) {
      return e.extend({
        getSelectFilters: function () {
          if (this.model.get("createdAccountId"))
            return {
              account: {
                type: "equals",
                attribute: "accountId",
                value: this.model.get("createdAccountId"),
                data: {
                  type: "is",
                  nameValue: this.model.get("createdAccountName"),
                },
              },
            };
        },
      });
    }
  ),
  define(
    "crm:views/lead/fields/created-contact",
    ["views/fields/link"],
    function (e) {
      return e.extend({
        getSelectFilters: function () {
          if (this.model.get("createdAccountId"))
            return {
              account: {
                type: "equals",
                attribute: "accountId",
                value: this.model.get("createdAccountId"),
                data: {
                  type: "is",
                  nameValue: this.model.get("createdAccountName"),
                },
              },
            };
        },
      });
    }
  ),
  define(
    "crm:views/lead/fields/acceptance-status",
    ["views/fields/enum-column"],
    function (e) {
      return e.extend({
        searchTypeList: ["anyOf", "noneOf"],
        setup: function () {
          (this.params.options = this.getMetadata().get(
            "entityDefs.Meeting.fields.acceptanceStatus.options"
          )),
            (this.params.translation = "Meeting.options.acceptanceStatus"),
            e.prototype.setup.call(this);
        },
      });
    }
  ),
  define(
    "crm:views/knowledge-base-article/list",
    ["views/list-with-categories"],
    function (e) {
      return e.extend({
        categoryScope: "KnowledgeBaseCategory",
        categoryField: "categories",
        categoryFilterType: "inCategory",
      });
    }
  ),
  define(
    "crm:views/knowledge-base-article/record/list",
    ["views/record/list"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/knowledge-base-article/record/edit",
    ["views/record/edit"],
    function (e) {
      return e.extend({ saveAndContinueEditingAction: !0 });
    }
  ),
  define(
    "crm:views/knowledge-base-article/record/edit-quick",
    ["views/record/edit-small"],
    function (e) {
      return e.extend({ isWide: !0, sideView: !1 });
    }
  ),
  define(
    "modules/crm/views/knowledge-base-article/record/detail",
    ["exports", "modules/crm/knowledge-base-helper", "views/record/detail"],
    function (e, t, i) {
      "use strict";
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0),
        (t = s(t));
      var a = (i = s(i)).default.extend({
        saveAndContinueEditingAction: !0,
        setup: function () {
          i.default.prototype.setup.call(this),
            this.getUser().isPortal() && (this.sideDisabled = !0),
            this.getAcl().checkScope("Email", "create") &&
              this.dropdownItemList.push({
                label: "Send in Email",
                name: "sendInEmail",
              }),
            this.getUser().isPortal() &&
              (this.getAcl().checkScope(this.scope, "edit") ||
                this.model.getLinkMultipleIdList("attachments").length ||
                (this.hideField("attachments"),
                this.listenToOnce(this.model, "sync", () => {
                  this.model.getLinkMultipleIdList("attachments").length &&
                    this.showField("attachments");
                })));
        },
        actionSendInEmail: function () {
          Espo.Ui.notify(this.translate("pleaseWait", "messages"));
          let e = new t.default(this.getLanguage());
          e.getAttributesForEmail(this.model, {}, (e) => {
            var t =
              this.getMetadata().get("clientDefs.Email.modalViews.compose") ||
              "views/modals/compose-email";
            this.createView(
              "composeEmail",
              t,
              {
                attributes: e,
                selectTemplateDisabled: !0,
                signatureDisabled: !0,
              },
              (e) => {
                Espo.Ui.notify(!1), e.render();
              }
            );
          });
        },
        afterRender: function () {
          i.default.prototype.afterRender.call(this),
            this.getUser().isPortal() &&
              this.$el
                .find('.field[data-name="body"]')
                .css("minHeight", "400px");
        },
      });
      e.default = a;
    }
  ),
  define(
    "crm:views/knowledge-base-article/record/detail-quick",
    ["views/record/detail-small"],
    function (e) {
      return e.extend({ isWide: !0, sideView: !1 });
    }
  ),
  define(
    "crm:views/knowledge-base-article/modals/select-records",
    ["crm:views/document/modals/select-records"],
    function (e) {
      return e.extend({
        categoryScope: "KnowledgeBaseCategory",
        categoryField: "categories",
        categoryFilterType: "inCategory",
      });
    }
  ),
  define(
    "crm:views/knowledge-base-article/fields/status",
    ["views/fields/enum"],
    function (t) {
      return t.extend({
        setup: function () {
          t.prototype.setup.call(this);
          var e = !1;
          this.on("change", () => {
            "Published" === this.model.get("status")
              ? this.model.get("publishDate") ||
                ((e = !0),
                this.model.set("publishDate", this.getDateTime().getToday()))
              : e && this.model.set("publishDate", null);
          });
        },
      });
    }
  ),
  define(
    "crm:views/knowledge-base-article/fields/language",
    ["views/fields/enum"],
    function (e) {
      return e.extend({
        setupOptions: function () {
          (this.params.options = Espo.Utils.clone(
            this.getMetadata().get(["app", "language", "list"]) || []
          )),
            this.params.options.unshift(""),
            (this.translatedOptions = Espo.Utils.clone(
              this.getLanguage().translate("language", "options") || {}
            )),
            (this.translatedOptions[""] = this.translate(
              "Any",
              "labels",
              "KnowledgeBaseArticle"
            ));
        },
      });
    }
  ),
  define("crm:views/fields/ico", ["views/fields/base"], function (e) {
    return e.extend({
      templateContent: `{{! ~}}
            <span
                class="{{iconClass}} text-muted action icon"
                style="cursor: pointer"
                title="{{viewLabel}}"
                data-action="quickView"
                data-id="{{id}}"
                {{#if notRelationship}}data-scope="{{scope}}"{{/if}}
            ></span>
        {{~!}}`,
      data: function () {
        return {
          notRelationship: this.params.notRelationship,
          viewLabel: this.translate("View"),
          id: this.model.id,
          scope: this.model.entityType,
          iconClass:
            this.getMetadata().get([
              "clientDefs",
              this.model.entityType,
              "iconClass",
            ]) || "far fa-calendar-times",
        };
      },
    });
  }),
  define("crm:views/event-confirmation/confirmation", ["view"], function (e) {
    return e.extend({
      template: "crm:event-confirmation/confirmation",
      data: function () {
        var e = this.actionData.style || "default";
        return {
          actionData: this.actionData,
          style: e,
          dateStart: this.actionData.dateStart
            ? this.convertDateTime(this.actionData.dateStart)
            : null,
          sentDateStart: this.actionData.sentDateStart
            ? this.convertDateTime(this.actionData.sentDateStart)
            : null,
          dateStartChanged:
            this.actionData.sentDateStart &&
            this.actionData.dateStart !== this.actionData.sentDateStart,
          actionDataList: this.getActionDataList(),
        };
      },
      setup: function () {
        this.actionData = this.options.actionData;
      },
      getActionDataList: function () {
        let i = {
            Accepted: "accept",
            Declined: "decline",
            Tentative: "tentative",
          },
          e = ["Accepted", "Tentative", "Declined"];
        if (!e.includes(this.actionData.status)) return null;
        let s = window.location.href.replace(
          "action=" + i[this.actionData.status],
          "action={action}"
        );
        return e.map((e) => {
          var t = e === this.actionData.status;
          return {
            active: t,
            link: t ? "" : s.replace("{action}", i[e]),
            label: this.actionData.statusTranslation[e],
          };
        });
      },
      convertDateTime: function (e) {
        var t = this.getConfig().get("timeZone");
        let i = this.getDateTime().toMoment(e).tz(t);
        return (
          i.format(this.getDateTime().getDateTimeFormat()) +
          " " +
          i.format("Z z")
        );
      },
    });
  }),
  define("crm:views/email-queue-item/list", ["views/list"], function (e) {
    return e.extend({ createButton: !1 });
  }),
  define(
    "crm:views/email-queue-item/record/list",
    ["views/record/list"],
    function (e) {
      return e.extend({
        rowActionsView: "views/record/row-actions/remove-only",
      });
    }
  ),
  define(
    "crm:views/document/list",
    ["views/list-with-categories"],
    function (e) {
      return e.extend({
        quickCreate: !0,
        currentCategoryId: null,
        currentCategoryName: "",
        categoryScope: "DocumentFolder",
        categoryField: "folder",
        categoryFilterType: "inCategory",
      });
    }
  ),
  define(
    "crm:views/document/fields/name",
    ["views/fields/varchar"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            this.model.isNew() &&
              this.listenTo(this.model, "change:fileName", () => {
                this.model.set("name", this.model.get("fileName"));
              });
        },
      });
    }
  ),
  define("crm:views/document/fields/file", ["views/fields/file"], function (i) {
    return i.extend({
      getValueForDisplay: function () {
        var e, t;
        return this.isListMode()
          ? ((e = this.model.get(this.nameName)),
            (t = this.model.get(this.idName))
              ? $("<a>")
                  .attr("title", e)
                  .attr(
                    "href",
                    this.getBasePath() + "?entryPoint=download&id=" + t
                  )
                  .attr("target", "_BLANK")
                  .append($("<span>").addClass("fas fa-paperclip small"))
                  .get(0).outerHTML
              : "")
          : i.prototype.getValueForDisplay.call(this);
      },
    });
  }),
  define(
    "crm:views/dashlets/tasks",
    ["views/dashlets/abstract/record-list"],
    function (e) {
      return e.extend({
        listView: "crm:views/task/record/list-expanded",
        rowActionsView: "crm:views/task/record/row-actions/dashlet",
      });
    }
  ),
  define(
    "crm:views/dashlets/meetings",
    ["views/dashlets/abstract/record-list"],
    function (e) {
      return e.extend({
        name: "Meetings",
        scope: "Meeting",
        listView: "crm:views/meeting/record/list-expanded",
        rowActionsView: "crm:views/meeting/record/row-actions/dashlet",
      });
    }
  ),
  define(
    "crm:views/dashlets/calls",
    ["views/dashlets/abstract/record-list"],
    function (e) {
      return e.extend({
        name: "Calls",
        scope: "Call",
        listView: "crm:views/call/record/list-expanded",
        rowActionsView: "crm:views/call/record/row-actions/dashlet",
      });
    }
  ),
  define(
    "crm:views/dashlets/calendar",
    ["views/dashlets/abstract/base"],
    function (e) {
      return e.extend({
        name: "Calendar",
        noPadding: !0,
        templateContent:
          '<div class="calendar-container">{{{calendar}}} </div>',
        init: function () {
          e.prototype.init.call(this);
        },
        afterRender: function () {
          var t,
            i,
            e = this.getOption("mode");
          if ("timeline" === e)
            return (
              (t = []),
              (s = this.getOption("usersIds") || []),
              (i = this.getOption("usersNames") || {}),
              s.forEach((e) => {
                t.push({ id: e, name: i[e] || e });
              }),
              (s =
                this.getMetadata().get([
                  "clientDefs",
                  "Calendar",
                  "timelineView",
                ]) || "crm:views/calendar/timeline"),
              void this.createView(
                "calendar",
                s,
                {
                  selector: "> .calendar-container",
                  header: !1,
                  calendarType: "shared",
                  userList: t,
                  enabledScopeList: this.getOption("enabledScopeList"),
                  noFetchLoadingMessage: !0,
                },
                (e) => {
                  e.render();
                }
              )
            );
          var s = null,
            a =
              (~["basicWeek", "month", "basicDay"].indexOf(e) &&
                (s = this.getOption("teamsIds")),
              this.getMetadata().get([
                "clientDefs",
                "Calendar",
                "calendarView",
              ]) || "crm:views/calendar/calendar");
          this.createView(
            "calendar",
            a,
            {
              mode: e,
              selector: "> .calendar-container",
              header: !1,
              enabledScopeList: this.getOption("enabledScopeList"),
              containerSelector: this.getSelector(),
              teamIdList: s,
            },
            (s) => {
              this.listenTo(s, "view", () => {
                if ("month" === this.getOption("mode")) {
                  var i = this.getOption("title");
                  let e = $("<span>").append(
                      $("<span>").text(i),
                      ' <span class="chevron-right"></span> ',
                      $("<span>").text(s.getTitle())
                    ),
                    t = this.$el
                      .closest(".panel")
                      .find(".panel-heading > .panel-title > span");
                  t.html(e.get(0).innerHTML);
                }
              }),
                s.render(),
                this.on("resize", () => {
                  setTimeout(() => s.adjustSize(), 50);
                });
            }
          );
        },
        setupActionList: function () {
          this.actionList.unshift({
            name: "viewCalendar",
            text: this.translate("View Calendar", "labels", "Calendar"),
            url: "#Calendar",
            iconHtml: '<span class="far fa-calendar-alt"></span>',
            onClick: () => this.actionViewCalendar(),
          });
        },
        setupButtonList: function () {
          "timeline" !== this.getOption("mode") &&
            (this.buttonList.push({
              name: "previous",
              html: '<span class="fas fa-chevron-left"></span>',
              onClick: () => this.actionPrevious(),
            }),
            this.buttonList.push({
              name: "next",
              html: '<span class="fas fa-chevron-right"></span>',
              onClick: () => this.actionNext(),
            }));
        },
        actionRefresh: function () {
          var e = this.getView("calendar");
          e && e.actionRefresh();
        },
        actionNext: function () {
          var e = this.getView("calendar");
          e && e.actionNext();
        },
        actionPrevious: function () {
          var e = this.getView("calendar");
          e && e.actionPrevious();
        },
        actionViewCalendar: function () {
          this.getRouter().navigate("#Calendar", { trigger: !0 });
        },
      });
    }
  ),
  define(
    "crm:views/dashlets/activities",
    ["views/dashlets/abstract/base", "multi-collection"],
    function (e, t) {
      return e.extend({
        name: "Activities",
        templateContent: '<div class="list-container">{{{list}}}</div>',
        rowActionsView: "crm:views/record/row-actions/activities-dashlet",
        defaultListLayout: {
          rows: [
            [
              {
                name: "ico",
                view: "crm:views/fields/ico",
                params: { notRelationship: !0 },
              },
              { name: "name", link: !0 },
            ],
            [{ name: "dateStart" }],
          ],
        },
        listLayoutEntityTypeMap: {
          Task: {
            rows: [
              [
                {
                  name: "ico",
                  view: "crm:views/fields/ico",
                  params: { notRelationship: !0 },
                },
                { name: "name", link: !0 },
              ],
              [
                { name: "dateEnd" },
                {
                  name: "priority",
                  view: "crm:views/task/fields/priority-for-dashlet",
                },
              ],
            ],
          },
        },
        init: function () {
          e.prototype.init.call(this);
        },
        setup: function () {
          (this.seeds = {}),
            (this.scopeList = this.getOption("enabledScopeList") || []),
            (this.listLayout = {}),
            this.scopeList.forEach((e) => {
              e in this.listLayoutEntityTypeMap
                ? (this.listLayout[e] = this.listLayoutEntityTypeMap[e])
                : (this.listLayout[e] = this.defaultListLayout);
            }),
            this.wait(!0);
          var i = 0;
          this.scopeList.forEach((t) => {
            this.getModelFactory().create(t, (e) => {
              (this.seeds[t] = e),
                ++i === this.scopeList.length && this.wait(!1);
            });
          }),
            this.scopeList
              .slice(0)
              .reverse()
              .forEach((e) => {
                this.getAcl().checkScope(e, "create") &&
                  this.actionList.unshift({
                    name: "createActivity",
                    text: this.translate("Create " + e, "labels", e),
                    iconHtml: '<span class="fas fa-plus"></span>',
                    url: "#" + e + "/create",
                    data: { scope: e },
                  });
              });
        },
        afterRender: function () {
          (this.collection = new t()),
            (this.collection.seeds = this.seeds),
            (this.collection.url = "Activities/upcoming"),
            (this.collection.maxSize =
              this.getOption("displayRecords") ||
              this.getConfig().get("recordsPerPageSmall") ||
              5),
            (this.collection.data.entityTypeList = this.scopeList),
            (this.collection.data.futureDays = this.getOption("futureDays")),
            this.listenToOnce(this.collection, "sync", () => {
              this.createView(
                "list",
                "crm:views/record/list-activities-dashlet",
                {
                  selector: "> .list-container",
                  pagination: !1,
                  type: "list",
                  rowActionsView: this.rowActionsView,
                  checkboxes: !1,
                  collection: this.collection,
                  listLayout: this.listLayout,
                },
                (e) => {
                  e.render();
                }
              );
            }),
            this.collection.fetch();
        },
        actionRefresh: function () {
          this.collection.fetch({
            previousDataList: this.collection.models.map((e) =>
              Espo.Utils.cloneDeep(e.attributes)
            ),
          });
        },
        actionCreateActivity: function (e) {
          var e = e.scope,
            t = {},
            i =
              (this.populateAttributesAssignedUser(e, t),
              Espo.Ui.notify(" ... "),
              this.getMetadata().get("clientDefs." + e + ".modalViews.edit") ||
                "views/modals/edit");
          this.createView(
            "quickCreate",
            i,
            { scope: e, attributes: t },
            (e) => {
              e.render(),
                e.notify(!1),
                this.listenToOnce(e, "after:save", () => {
                  this.actionRefresh();
                });
            }
          );
        },
        actionCreateMeeting: function () {
          var e = {},
            t =
              (this.populateAttributesAssignedUser("Meeting", e),
              Espo.Ui.notify(" ... "),
              this.getMetadata().get("clientDefs.Meeting.modalViews.edit") ||
                "views/modals/edit");
          this.createView(
            "quickCreate",
            t,
            { scope: "Meeting", attributes: e },
            (e) => {
              e.render(),
                e.notify(!1),
                this.listenToOnce(e, "after:save", () => {
                  this.actionRefresh();
                });
            }
          );
        },
        actionCreateCall: function () {
          var e = {},
            t =
              (this.populateAttributesAssignedUser("Call", e),
              Espo.Ui.notify(" ... "),
              this.getMetadata().get("clientDefs.Call.modalViews.edit") ||
                "views/modals/edit");
          this.createView(
            "quickCreate",
            t,
            { scope: "Call", attributes: e },
            (e) => {
              e.render(),
                e.notify(!1),
                this.listenToOnce(e, "after:save", () => {
                  this.actionRefresh();
                });
            }
          );
        },
        populateAttributesAssignedUser: function (e, t) {
          this.getMetadata().get(["entityDefs", e, "fields", "assignedUsers"])
            ? ((t.assignedUsersIds = [this.getUser().id]),
              (t.assignedUsersNames = {}),
              (t.assignedUsersNames[this.getUser().id] =
                this.getUser().get("name")))
            : ((t.assignedUserId = this.getUser().id),
              (t.assignedUserName = this.getUser().get("name")));
        },
      });
    }
  ),
  define(
    "crm:views/dashlets/options/sales-pipeline",
    ["crm:views/dashlets/options/chart"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            "own" === this.getAcl().getLevel("Opportunity", "read") &&
              this.hideField("team");
        },
      });
    }
  ),
  define(
    "crm:views/dashlets/options/calendar",
    ["views/dashlets/options/base"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            this.manageFields(),
            this.listenTo(this.model, "change:mode", this.manageFields, this);
        },
        init: function () {
          e.prototype.init.call(this),
            (this.fields.enabledScopeList.options =
              this.getConfig().get("calendarEntityList") || []);
        },
        manageFields: function (e, t, i) {
          "timeline" === this.model.get("mode")
            ? this.showField("users")
            : this.hideField("users"),
            "no" !== this.getAcl().get("userPermission") &&
            ~["basicWeek", "month", "basicDay"].indexOf(this.model.get("mode"))
              ? this.showField("teams")
              : (i && i.ui && this.model.set("teamsIds", []),
                this.hideField("teams"));
        },
      });
    }
  ),
  define(
    "crm:views/dashlets/options/activities",
    ["views/dashlets/options/base"],
    function (i) {
      return i.extend({
        init: function () {
          i.prototype.init.call(this);
          var t = [],
            e = Espo.Utils.clone(
              this.getConfig().get("activitiesEntityList") || []
            );
          e.push("Task"),
            e.forEach((e) => {
              this.getMetadata().get(["scopes", e, "disabled"]) ||
                (this.getAcl().checkScope(e) && t.push(e));
            }),
            (this.fields.enabledScopeList.options = t);
        },
      });
    }
  ),
  define(
    "crm:views/dashlets/options/sales-pipeline/fields/team",
    ["views/fields/link"],
    function (e) {
      return e.extend({
        getSelectBoolFilterList: function () {
          if ("team" === this.getAcl().getLevel("Opportunity", "read"))
            return ["onlyMy"];
        },
      });
    }
  ),
  define("crm:views/contact/detail", ["views/detail"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/contact/record/detail-small",
    ["views/record/detail-small", "crm:views/contact/record/detail"],
    function (e, t) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/contact/modals/select-for-portal-user",
    ["views/modals/select-records"],
    function (e) {
      return e.extend({
        setup: function () {
          e.prototype.setup.call(this),
            this.buttonList.unshift({
              name: "skip",
              text: this.translate("Proceed w/o Contact", "labels", "User"),
            });
        },
        actionSkip: function () {
          this.trigger("skip"), this.remove();
        },
      });
    }
  ),
  define(
    "crm:views/contact/fields/title",
    ["views/fields/varchar"],
    function (e) {
      return e.extend({
        setupOptions: function () {
          this.params.options = Espo.Utils.clone(
            this.getMetadata().get(
              "entityDefs.Account.fields.contactRole.options"
            ) || []
          );
        },
      });
    }
  ),
  define(
    "crm:views/contact/fields/opportunity-role",
    ["views/fields/enum"],
    function (e) {
      return e.extend({ searchTypeList: ["anyOf", "noneOf"] });
    }
  ),
  define(
    "crm:views/contact/fields/name-for-account",
    ["views/fields/person-name"],
    function (e) {
      return e.extend({
        afterRender: function () {
          e.prototype.afterRender.call(this),
            "listLink" === this.mode &&
              this.model.get("accountIsInactive") &&
              this.$el.find("a").css("text-decoration", "line-through");
        },
        getAttributeList: function () {
          return ["name", "accountIsInactive"];
        },
      });
    }
  ),
  define(
    "crm:views/contact/fields/accounts",
    ["views/fields/link-multiple-with-columns"],
    function (n) {
      return n.extend({
        getAttributeList: function () {
          var e = n.prototype.getAttributeList.call(this);
          return e.push("accountId"), e.push("accountName"), e.push("title"), e;
        },
        setup: function () {
          n.prototype.setup.call(this),
            (this.events['click [data-action="switchPrimary"]'] = (e) => {
              let t = $(e.currentTarget);
              e = t.data("id");
              t.hasClass("active") ||
                (this.$el
                  .find('button[data-action="switchPrimary"]')
                  .removeClass("active")
                  .children()
                  .addClass("text-muted"),
                t.addClass("active").children().removeClass("text-muted"),
                this.setPrimaryId(e));
            }),
            (this.primaryIdFieldName = "accountId"),
            (this.primaryNameFieldName = "accountName"),
            (this.primaryRoleFieldName = "title"),
            (this.primaryId = this.model.get(this.primaryIdFieldName)),
            (this.primaryName = this.model.get(this.primaryNameFieldName)),
            this.listenTo(
              this.model,
              "change:" + this.primaryIdFieldName,
              () => {
                (this.primaryId = this.model.get(this.primaryIdFieldName)),
                  (this.primaryName = this.model.get(
                    this.primaryNameFieldName
                  ));
              }
            ),
            (this.isEditMode() || this.isDetailMode()) &&
              (this.events['click a[data-action="setPrimary"]'] = (e) => {
                e = $(e.currentTarget).data("id");
                this.setPrimaryId(e), this.reRender();
              });
        },
        setPrimaryId: function (e) {
          (this.primaryId = e),
            (this.primaryName = e ? this.nameHash[e] : null),
            this.trigger("change");
        },
        renderLinks: function () {
          this.primaryId && this.addLinkHtml(this.primaryId, this.primaryName),
            this.ids.forEach((e) => {
              e !== this.primaryId && this.addLinkHtml(e, this.nameHash[e]);
            });
        },
        getValueForDisplay: function () {
          if (this.isDetailMode() || this.isListMode()) {
            let t = [];
            return (
              this.primaryId &&
                t.push(
                  this.getDetailLinkHtml(this.primaryId, this.primaryName)
                ),
              this.ids.forEach((e) => {
                e !== this.primaryId && t.push(this.getDetailLinkHtml(e));
              }),
              t.join("")
            );
          }
        },
        getDetailLinkHtml: function (e, t) {
          t = n.prototype.getDetailLinkHtml.call(this, e, t);
          if (this.getColumnValue(e, "isInactive")) {
            let e = $(t);
            return (
              e.find("a").css("text-decoration", "line-through"),
              e.prop("outerHTML")
            );
          }
          return t;
        },
        afterAddLink: function (e) {
          n.prototype.afterAddLink.call(this, e),
            1 === this.ids.length &&
              ((this.primaryId = e), (this.primaryName = this.nameHash[e])),
            this.controlPrimaryAppearance();
        },
        afterDeleteLink: function (e) {
          if (
            (n.prototype.afterDeleteLink.call(this, e), 0 === this.ids.length)
          )
            return (this.primaryId = null), void (this.primaryName = null);
          e === this.primaryId &&
            ((this.primaryId = this.ids[0]),
            (this.primaryName = this.nameHash[this.primaryId])),
            this.controlPrimaryAppearance();
        },
        controlPrimaryAppearance: function () {
          this.$el.find("li.set-primary-list-item").removeClass("hidden"),
            this.primaryId &&
              this.$el
                .find(
                  'li.set-primary-list-item[data-id="' + this.primaryId + '"]'
                )
                .addClass("hidden");
        },
        addLinkHtml: function (e, t) {
          if (((t = t || e), this.isSearchMode()))
            return n.prototype.addLinkHtml.call(this, e, t);
          let i = n.prototype.addLinkHtml.call(this, e, t);
          var t = e === this.primaryId,
            s = $("<a>")
              .attr("role", "button")
              .attr("tabindex", "0")
              .attr("data-action", "setPrimary")
              .attr("data-id", e)
              .text(this.translate("Set Primary", "labels", "Account"));
          let a = $("<li>")
            .addClass("set-primary-list-item")
            .attr("data-id", e)
            .append(s);
          (!t && 1 !== this.ids.length) || a.addClass("hidden"),
            i.find("ul.dropdown-menu").append(a),
            this.getColumnValue(e, "isInactive") &&
              i
                .find("div.link-item-name")
                .css("text-decoration", "line-through");
        },
        afterRender: function () {
          n.prototype.afterRender.call(this);
        },
        fetch: function () {
          let e = n.prototype.fetch.call(this);
          return (
            (e[this.primaryIdFieldName] = this.primaryId),
            (e[this.primaryNameFieldName] = this.primaryName),
            (e[this.primaryRoleFieldName] =
              (this.columns[this.primaryId] || {}).role || null),
            (e.accountIsInactive =
              (this.columns[this.primaryId] || {}).isInactive || !1),
            this.primaryId ||
              ((e[this.primaryRoleFieldName] = null),
              (e.accountIsInactive = null)),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/contact/fields/account",
    ["views/fields/link"],
    function (t) {
      return t.extend({
        getAttributeList: function () {
          var e = t.prototype.getAttributeList.call(this);
          return e.push("accountIsInactive"), e;
        },
        afterRender: function () {
          t.prototype.afterRender.call(this),
            ("list" !== this.mode && "detail" !== this.mode) ||
              (this.model.get("accountIsInactive") &&
                this.$el.find("a").css("textDecoration", "line-through"));
        },
      });
    }
  ),
  define(
    "crm:views/contact/fields/account-role",
    ["views/fields/varchar"],
    function (t) {
      return t.extend({
        detailTemplate: "crm:contact/fields/account-role/detail",
        listTemplate: "crm:contact/fields/account-role/detail",
        setup: function () {
          t.prototype.setup.call(this),
            this.listenTo(this.model, "change:title", () => {
              this.model.set("accountRole", this.model.get("title"));
            });
        },
        getAttributeList: function () {
          var e = t.prototype.getAttributeList.call(this);
          return e.push("title"), e.push("accountIsInactive"), e;
        },
        data: function () {
          var e = t.prototype.data.call(this);
          return (
            this.model.has("accountIsInactive") &&
              (e.accountIsInactive = this.model.get("accountIsInactive")),
            e
          );
        },
      });
    }
  ),
  define("crm:views/case/record/detail", ["views/record/detail"], function (e) {
    return e.extend({
      selfAssignAction: !0,
      getSelfAssignAttributes: function () {
        if (
          "New" === this.model.get("status") &&
          ~(
            this.getMetadata().get([
              "entityDefs",
              "Case",
              "fields",
              "status",
              "options",
            ]) || []
          ).indexOf("Assigned")
        )
          return { status: "Assigned" };
      },
    });
  }),
  define(
    "crm:views/case/record/panels/activities",
    ["crm:views/record/panels/activities"],
    function (i) {
      return i.extend({
        getComposeEmailAttributes: function (e, t, s) {
          (t = t || {}),
            Espo.Ui.notify(" ... "),
            i.prototype.getComposeEmailAttributes.call(this, e, t, (i) => {
              (i.name =
                "[#" +
                this.model.get("number") +
                "] " +
                this.model.get("name")),
                Espo.Ajax.getRequest(
                  "Case/action/emailAddressList?id=" + this.model.id
                ).then((e) => {
                  (i.to = ""),
                    (i.cc = ""),
                    (i.nameHash = {}),
                    e.forEach((e, t) => {
                      0 === t
                        ? (i.to += e.emailAddress + ";")
                        : (i.cc += e.emailAddress + ";"),
                        (i.nameHash[e.emailAddress] = e.name);
                    }),
                    Espo.Ui.notify(!1),
                    s.call(this, i);
                });
            });
        },
      });
    }
  ),
  define(
    "crm:views/case/fields/contacts",
    ["views/fields/link-multiple-with-primary"],
    function (e) {
      return e.extend({ primaryLink: "contact" });
    }
  ),
  define("crm:views/case/fields/contact", ["views/fields/link"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/campaign-tracking-url/record/edit",
    ["views/record/edit"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/campaign-tracking-url/record/edit-small",
    ["views/record/edit-small"],
    function (e) {
      return e.extend({});
    }
  ),
  define(
    "crm:views/campaign-log-record/fields/data",
    ["views/fields/base"],
    function (e) {
      return e.extend({
        listTemplate: "crm:campaign-log-record/fields/data/detail",
        getValueForDisplay: function () {
          switch (this.model.get("action")) {
            case "Sent":
            case "Opened":
            case "Clicked":
              return this.model.get("objectId") &&
                this.model.get("objectType") &&
                this.model.get("objectName")
                ? $("<a>")
                    .attr(
                      "href",
                      "#" +
                        this.model.get("objectType") +
                        "/view/" +
                        this.model.get("objectId")
                    )
                    .text(this.model.get("objectName"))
                    .get(0).outerHTML
                : $("<span>")
                    .text(this.model.get("stringData") || "")
                    .get(0).outerHTML;
            case "Opted Out":
              return $("<span>")
                .text(this.model.get("stringData") || "")
                .addClass("text-danger")
                .get(0).outerHTML;
            case "Bounced":
              var e = this.model.get("stringData"),
                t = this.model.get("stringAdditionalData"),
                i =
                  "Hard" === t
                    ? this.translate("hard", "labels", "Campaign")
                    : this.translate("soft", "labels", "Campaign");
              return $("<span>")
                .append(
                  $("<span>").addClass("label label-default").text(i),
                  " ",
                  $("<s>")
                    .text(e)
                    .addClass("Hard" === t ? "text-danger" : "")
                )
                .get(0).outerHTML;
          }
          return "";
        },
      });
    }
  ),
  define("crm:views/campaign/unsubscribe", ["view"], function (e) {
    return e.extend({
      template: "crm:campaign/unsubscribe",
      data: function () {
        var e = this.options.actionData;
        return {
          revertUrl:
            e.hash && e.emailAddress
              ? "?entryPoint=subscribeAgain&emailAddress=" +
                e.emailAddress +
                "&hash=" +
                e.hash
              : "?entryPoint=subscribeAgain&id=" + e.queueItemId,
        };
      },
    });
  }),
  define("crm:views/campaign/tracking-url", ["view"], function (e) {
    return e.extend({
      template: "crm:campaign/tracking-url",
      data: function () {
        return { message: this.options.message };
      },
    });
  }),
  define("crm:views/campaign/subscribe-again", ["view"], function (e) {
    return e.extend({
      template: "crm:campaign/subscribe-again",
      data: function () {
        var e = this.options.actionData,
          e =
            e.hash && e.emailAddress
              ? "?entryPoint=unsubscribe&emailAddress=" +
                e.emailAddress +
                "&hash=" +
                e.hash
              : "?entryPoint=unsubscribe&id=" + e.queueItemId;
        return { revertUrl: e };
      },
    });
  }),
  define("crm:views/campaign/detail", ["views/detail"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/campaign/record/detail",
    ["views/record/detail"],
    function (e) {
      return e.extend({
        duplicateAction: !0,
        bottomView: "crm:views/campaign/record/detail-bottom",
        setupActionItems: function () {
          e.prototype.setupActionItems.call(this),
            this.dropdownItemList.push({
              label: "Generate Mail Merge PDF",
              name: "generateMailMergePdf",
              hidden: !this.isMailMergeAvailable(),
            }),
            this.listenTo(
              this.model,
              "change",
              function () {
                this.isMailMergeAvailable()
                  ? this.showActionItem("generateMailMergePdf")
                  : this.hideActionItem("generateMailMergePdf");
              },
              this
            );
        },
        afterRender: function () {
          e.prototype.afterRender.call(this);
        },
        isMailMergeAvailable: function () {
          return (
            "Mail" === this.model.get("type") &&
            !(
              !this.model.get("targetListsIds") ||
              !this.model.get("targetListsIds").length
            ) &&
            !!(
              this.model.get("leadsTemplateId") ||
              this.model.get("contactsTemplateId") ||
              this.model.get("accountsTemplateId") ||
              this.model.get("usersTemplateId")
            )
          );
        },
        actionGenerateMailMergePdf: function () {
          this.createView(
            "dialog",
            "crm:views/campaign/modals/mail-merge-pdf",
            { model: this.model },
            function (e) {
              e.render(),
                this.listenToOnce(e, "proceed", (e) => {
                  this.clearView("dialog"),
                    Espo.Ui.notify(" ... "),
                    Espo.Ajax.postRequest(
                      `Campaign/${this.model.id}/generateMailMerge`,
                      { link: e }
                    ).then((e) => {
                      Espo.Ui.notify(!1),
                        window.open(
                          "?entryPoint=download&id=" + e.id,
                          "_blank"
                        );
                    });
                });
            }
          );
        },
      });
    }
  ),
  define(
    "crm:views/campaign/record/detail-bottom",
    ["views/record/detail-bottom"],
    function (e) {
      return e.extend({
        setupPanels: function () {
          e.prototype.setupPanels.call(this),
            this.panelList.unshift({
              name: "massEmails",
              label: this.translate("massEmails", "links", "Campaign"),
              view: "views/record/panels/relationship",
              sticked: !0,
              hidden: !0,
              select: !1,
              recordListView: "crm:views/mass-email/record/list-for-campaign",
              rowActionsView:
                "crm:views/mass-email/record/row-actions/for-campaign",
              index: -2,
            }),
            this.panelList.unshift({
              name: "trackingUrls",
              label: this.translate("trackingUrls", "links", "Campaign"),
              view: "views/record/panels/relationship",
              sticked: !0,
              hidden: !0,
              select: !1,
              rowActionsView: "views/record/row-actions/relationship-no-unlink",
              index: -1,
            }),
            this.listenTo(this.model, "change", () => {
              this.manageMassEmails();
            });
        },
        afterRender: function () {
          e.prototype.afterRender.call(this), this.manageMassEmails();
        },
        manageMassEmails: function () {
          var e = this.getParentView();
          e &&
            (~["Email", "Newsletter"].indexOf(this.model.get("type"))
              ? (e.showPanel("massEmails"), e.showPanel("trackingUrls"))
              : (e.hidePanel("massEmails"), e.hidePanel("trackingUrls")));
        },
      });
    }
  ),
  define(
    "crm:views/campaign/record/panels/campaign-stats",
    ["views/record/panels/side"],
    function (e) {
      return e.extend({
        controlStatsFields: function () {
          var e, t;
          switch (this.model.get("type")) {
            case "Email":
            case "Newsletter":
              e = [
                "sentCount",
                "openedCount",
                "clickedCount",
                "optedOutCount",
                "bouncedCount",
                "leadCreatedCount",
                "optedInCount",
                "revenue",
              ];
              break;
            case "Web":
              e = ["leadCreatedCount", "optedInCount", "revenue"];
              break;
            case "Television":
            case "Radio":
              e = ["leadCreatedCount", "revenue"];
              break;
            case "Mail":
              e = ["sentCount", "leadCreatedCount", "optedInCount", "revenue"];
              break;
            default:
              e = ["leadCreatedCount", "revenue"];
          }
          this.getConfig().get("massEmailOpenTracking") ||
            (~(t = e.indexOf("openedCount")) && e.splice(t, 1)),
            this.statsFieldList.forEach((e) => {
              this.options.recordViewObject.hideField(e);
            }),
            e.forEach((e) => {
              this.options.recordViewObject.showField(e);
            }),
            this.getAcl().checkScope("Lead") ||
              this.options.recordViewObject.hideField("leadCreatedCount"),
            this.getAcl().checkScope("Opportunity") ||
              this.options.recordViewObject.hideField("revenue");
        },
        setupFields: function () {
          (this.fieldList = [
            "sentCount",
            "openedCount",
            "clickedCount",
            "optedOutCount",
            "bouncedCount",
            "leadCreatedCount",
            "optedInCount",
            "revenue",
          ]),
            (this.statsFieldList = this.fieldList);
        },
        setup: function () {
          e.prototype.setup.call(this),
            this.controlStatsFields(),
            this.listenTo(this.model, "change:type", () => {
              this.controlStatsFields();
            });
        },
        actionRefresh: function () {
          this.model.fetch();
        },
      });
    }
  ),
  define(
    "crm:views/campaign/record/panels/campaign-log-records",
    ["views/record/panels/relationship"],
    function (t) {
      return t.extend({
        filterList: [
          "all",
          "sent",
          "opened",
          "optedOut",
          "bounced",
          "clicked",
          "optedIn",
          "leadCreated",
        ],
        data: function () {
          return _.extend(
            { filterList: this.filterList, filterValue: this.filterValue },
            t.prototype.data.call(this)
          );
        },
        setup: function () {
          var e;
          this.getAcl().checkScope("TargetList", "create") &&
            this.actionList.push({
              action: "createTargetList",
              label: "Create Target List",
            }),
            (this.filterList = Espo.Utils.clone(this.filterList)),
            this.getConfig().get("massEmailOpenTracking") ||
              (~(e = this.filterList.indexOf("opened")) &&
                this.filterList.splice(e, 1)),
            t.prototype.setup.call(this);
        },
        actionCreateTargetList: function () {
          var e = {
              sourceCampaignId: this.model.id,
              sourceCampaignName: this.model.get("name"),
            },
            t =
              (this.collection.data.primaryFilter
                ? ((t = Espo.Utils.upperCaseFirst(
                    this.collection.data.primaryFilter
                  ).replace(/([A-Z])/g, " $1")),
                  (e.includingActionList = [t]))
                : (e.includingActionList = []),
              this.getMetadata().get("clientDefs.TargetList.modalViews.edit") ||
                "views/modals/edit");
          this.createView(
            "quickCreate",
            t,
            {
              scope: "TargetList",
              attributes: e,
              fullFormDisabled: !0,
              layoutName: "createFromCampaignLog",
            },
            (e) => {
              e.render();
              var t = e.getView("edit");
              t && t.setFieldRequired("includingActionList"),
                this.listenToOnce(e, "after:save", () => {
                  Espo.Ui.success(this.translate("Done"));
                });
            }
          );
        },
      });
    }
  ),
  define(
    "crm:views/campaign/modals/mail-merge-pdf",
    ["views/modal", "ui/select"],
    function (e, t) {
      return e.extend({
        template: "crm:campaign/modals/mail-merge-pdf",
        data: function () {
          return { linkList: this.linkList };
        },
        setup: function () {
          e.prototype.setup.call(this),
            (this.headerText = this.translate(
              "Generate Mail Merge PDF",
              "labels",
              "Campaign"
            ));
          (this.linkList = []),
            ["contacts", "leads", "accounts", "users"].forEach((e) => {
              var t;
              this.model.get(e + "TemplateId") &&
                ((t = this.getMetadata().get([
                  "entityDefs",
                  "TargetList",
                  "links",
                  e,
                  "entity",
                ])),
                this.getAcl().checkScope(t) && this.linkList.push(e));
            }),
            this.buttonList.push({
              name: "proceed",
              label: "Proceed",
              style: "danger",
            }),
            this.buttonList.push({ name: "cancel", label: "Cancel" });
        },
        afterRender: function () {
          t.init(this.$el.find('.field[data-name="link"] select'));
        },
        actionProceed: function () {
          var e = this.$el.find('.field[data-name="link"] select').val();
          this.trigger("proceed", e);
        },
      });
    }
  ),
  define(
    "crm:views/campaign/fields/template",
    ["views/fields/link"],
    function (e) {
      return e.extend({
        createDisabled: !0,
        getSelectFilters: function () {
          return {
            entityType: {
              type: "in",
              value: [
                this.getMetadata().get([
                  "entityDefs",
                  "Campaign",
                  "fields",
                  this.name,
                  "targetEntityType",
                ]),
              ],
            },
          };
        },
      });
    }
  ),
  define(
    "crm:views/campaign/fields/int-with-percentage",
    ["views/fields/int"],
    function (e) {
      return e.extend({
        getValueForDisplay: function () {
          var e = this.name.substr(0, this.name.length - 5) + "Percentage",
            t = this.model.get(this.name),
            i = this.model.get(e);
          return null != i && i && (t += " (" + this.model.get(e) + "%)"), t;
        },
      });
    }
  ),
  define(
    "crm:views/call/detail",
    ["views/detail", "crm:views/meeting/detail"],
    function (e, t) {
      return e.extend({
        cancellationPeriod: "8 hours",
        setup: function () {
          e.prototype.setup.call(this),
            this.controlSendInvitationsButton(),
            this.controlAcceptanceStatusButton(),
            this.controlSendCancellationButton(),
            this.listenTo(this.model, "sync", () => {
              this.controlSendInvitationsButton(),
                this.controlSendCancellationButton();
            }),
            this.listenTo(this.model, "sync", () => {
              this.controlAcceptanceStatusButton();
            }),
            t.prototype.setupCancellationPeriod.call(this);
        },
        actionSendInvitations: function () {
          t.prototype.actionSendInvitations.call(this);
        },
        actionSendCancellation: function () {
          t.prototype.actionSendCancellation.call(this);
        },
        actionSetAcceptanceStatus: function () {
          t.prototype.actionSetAcceptanceStatus.call(this);
        },
        controlSendInvitationsButton: function () {
          t.prototype.controlSendInvitationsButton.call(this);
        },
        controlSendCancellationButton: function () {
          t.prototype.controlSendCancellationButton.call(this);
        },
        controlAcceptanceStatusButton: function () {
          t.prototype.controlAcceptanceStatusButton.call(this);
        },
      });
    }
  ),
  define(
    "crm:views/call/record/list-expanded",
    ["views/record/list-expanded", "crm:views/call/record/list"],
    function (e, t) {
      return e.extend({
        actionSetHeld: function (e) {
          t.prototype.actionSetHeld.call(this, e);
        },
        actionSetNotHeld: function (e) {
          t.prototype.actionSetNotHeld.call(this, e);
        },
      });
    }
  ),
  define(
    "crm:views/call/record/edit-small",
    ["views/record/edit"],
    function (e) {
      return e.extend({});
    }
  ),
  define("crm:views/call/record/detail", ["views/record/detail"], function (t) {
    return t.extend({
      duplicateAction: !0,
      setupActionItems: function () {
        t.prototype.setupActionItems.call(this),
          this.getAcl().checkModel(this.model, "edit") &&
            -1 === ["Held", "Not Held"].indexOf(this.model.get("status")) &&
            (this.dropdownItemList.push({ label: "Set Held", name: "setHeld" }),
            this.dropdownItemList.push({
              label: "Set Not Held",
              name: "setNotHeld",
            }));
      },
      manageAccessEdit: function (e) {
        t.prototype.manageAccessEdit.call(this, e),
          e &&
            (this.getAcl().checkModel(this.model, "edit", !0) ||
              (this.hideActionItem("setHeld"),
              this.hideActionItem("setNotHeld")));
      },
      actionSetHeld: function () {
        this.model.save({ status: "Held" }, { patch: !0 }).then(() => {
          Espo.Ui.success(this.translate("Saved")),
            this.removeButton("setHeld"),
            this.removeButton("setNotHeld");
        });
      },
      actionSetNotHeld: function () {
        this.model.save({ status: "Not Held" }, { patch: !0 }).then(() => {
          Espo.Ui.success(this.translate("Saved")),
            this.removeButton("setHeld"),
            this.removeButton("setNotHeld");
        });
      },
    });
  }),
  define(
    "crm:views/call/record/row-actions/default",
    ["views/record/row-actions/view-and-edit"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            this.options.acl.edit &&
              !~["Held", "Not Held"].indexOf(this.model.get("status")) &&
              (e.push({
                action: "setHeld",
                label: "Set Held",
                data: { id: this.model.id },
              }),
              e.push({
                action: "setNotHeld",
                label: "Set Not Held",
                data: { id: this.model.id },
              })),
            this.options.acl.delete &&
              e.push({
                action: "quickRemove",
                label: "Remove",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/call/record/row-actions/dashlet",
    ["views/record/row-actions/view-and-edit"],
    function (t) {
      return t.extend({
        getActionList: function () {
          var e = t.prototype.getActionList.call(this);
          return (
            this.options.acl.edit &&
              !~["Held", "Not Held"].indexOf(this.model.get("status")) &&
              (e.push({
                action: "setHeld",
                label: "Set Held",
                data: { id: this.model.id },
              }),
              e.push({
                action: "setNotHeld",
                label: "Set Not Held",
                data: { id: this.model.id },
              })),
            this.options.acl.delete &&
              e.push({
                action: "quickRemove",
                label: "Remove",
                data: { id: this.model.id, scope: this.model.entityType },
              }),
            e
          );
        },
      });
    }
  ),
  define(
    "crm:views/call/fields/leads",
    ["crm:views/meeting/fields/attendees", "crm:views/call/fields/contacts"],
    function (a, i) {
      return a.extend({
        getAttributeList: function () {
          let e = a.prototype.getAttributeList.call(this);
          return e.push("phoneNumbersMap"), e;
        },
        getDetailLinkHtml: function (e, t) {
          return i.prototype.getDetailLinkHtml.call(this, e, t);
        },
        getDetailLinkHtml1: function (e, t) {
          var t = a.prototype.getDetailLinkHtml.call(this, e, t),
            e = this.foreignScope + "_" + e,
            i = null,
            s = this.model.get("phoneNumbersMap") || {};
          return (
            e in s &&
              ((i = s[e]),
              (s = $(t).html()),
              (t =
                "<div>" +
                (s +=
                  ' <span class="text-muted chevron-right"></span> <a href="tel:' +
                  i +
                  '" class="small" data-phone-number="' +
                  i +
                  '" data-action="dial">' +
                  i +
                  "</a>") +
                "</div>")),
            t
          );
        },
      });
    }
  ),
  define(
    "crm:views/call/fields/date-end",
    ["views/fields/datetime"],
    function (e) {
      return e.extend({
        validateAfter: function () {
          var e = this.model.getFieldParam(this.name, "after");
          if (e) {
            var t = this.model.get(this.name),
              i = this.model.get(e);
            if (t && i)
              if (moment(t).unix() < moment(i).unix())
                return (
                  (t = this.translate("fieldShouldAfter", "messages")
                    .replace("{field}", this.getLabelText())
                    .replace(
                      "{otherField}",
                      this.translate(e, "fields", this.entityType)
                    )),
                  this.showValidationMessage(t),
                  !0
                );
          }
        },
      });
    }
  ),
  define("crm:views/calendar/mode-buttons", ["view"], function (e) {
    return e.extend({
      template: "crm:calendar/mode-buttons",
      visibleModeListCount: 3,
      data: function () {
        let e = Espo.Utils.clone(this.scopeList);
        e.unshift("all");
        var i = [];
        return (
          this.scopeList.forEach((e) => {
            let t = { scope: e };
            ~this.getParentView().enabledScopeList.indexOf(e) ||
              (t.disabled = !0),
              i.push(t);
          }),
          {
            mode: this.mode,
            visibleModeDataList: this.getVisibleModeDataList(),
            hiddenModeDataList: this.getHiddenModeDataList(),
            scopeFilterDataList: i,
            isCustomViewAvailable: this.isCustomViewAvailable,
            hasMoreItems: this.isCustomViewAvailable,
            hasWorkingTimeCalendarLink: this.getAcl().checkScope(
              "WorkingTimeCalendar"
            ),
          }
        );
      },
      setup: function () {
        (this.isCustomViewAvailable = this.options.isCustomViewAvailable),
          (this.modeList = this.options.modeList),
          (this.scopeList = this.options.scopeList),
          (this.mode = this.options.mode);
      },
      getModeDataList: function (e) {
        var t = [];
        if (
          (this.modeList.forEach((e) => {
            e = {
              mode: e,
              label: this.translate(e, "modes", "Calendar"),
              labelShort: this.translate(e, "modes", "Calendar").substr(0, 2),
            };
            t.push(e);
          }),
          this.isCustomViewAvailable &&
            (this.getPreferences().get("calendarViewDataList") || []).forEach(
              (e) => {
                ((e = Espo.Utils.clone(e)).mode = "view-" + e.id),
                  (e.label = e.name),
                  (e.labelShort = (e.name || "").substr(0, 2)),
                  t.push(e);
              }
            ),
          e)
        )
          return t;
        let i = -1;
        return (
          t.forEach((e, t) => {
            e.mode === this.mode && (i = t);
          }),
          i >= this.visibleModeListCount &&
            ((e = t[this.visibleModeListCount - 1]),
            (t[this.visibleModeListCount - 1] = t[i]),
            (t[i] = e)),
          t
        );
      },
      getVisibleModeDataList: function () {
        var e = this.getModeDataList(),
          i = [];
        return (
          e.forEach((e, t) => {
            t >= this.visibleModeListCount || i.push(e);
          }),
          i
        );
      },
      getHiddenModeDataList: function () {
        var e = this.getModeDataList(),
          i = [];
        return (
          e.forEach((e, t) => {
            t < this.visibleModeListCount || i.push(e);
          }),
          i
        );
      },
    });
  }),
  define(
    "modules/crm/views/calendar/calendar-page",
    ["exports", "view"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        template = "crm:calendar/calendar-page";
        el = "#main";
        fullCalendarModeList = [
          "month",
          "agendaWeek",
          "agendaDay",
          "basicWeek",
          "basicDay",
          "listWeek",
        ];
        events = {
          'click [data-action="createCustomView"]': function () {
            this.createCustomView();
          },
          'click [data-action="editCustomView"]': function () {
            this.editCustomView();
          },
        };
        shortcutKeys = {
          Home: function (e) {
            this.handleShortcutKeyHome(e);
          },
          Numpad7: function (e) {
            this.handleShortcutKeyHome(e);
          },
          Numpad4: function (e) {
            this.handleShortcutKeyArrowLeft(e);
          },
          Numpad6: function (e) {
            this.handleShortcutKeyArrowRight(e);
          },
          ArrowLeft: function (e) {
            this.handleShortcutKeyArrowLeft(e);
          },
          ArrowRight: function (e) {
            this.handleShortcutKeyArrowRight(e);
          },
          Minus: function (e) {
            this.handleShortcutKeyMinus(e);
          },
          Equal: function (e) {
            this.handleShortcutKeyPlus(e);
          },
          NumpadSubtract: function (e) {
            this.handleShortcutKeyMinus(e);
          },
          NumpadAdd: function (e) {
            this.handleShortcutKeyPlus(e);
          },
          Digit1: function (e) {
            this.handleShortcutKeyDigit(e, 1);
          },
          Digit2: function (e) {
            this.handleShortcutKeyDigit(e, 2);
          },
          Digit3: function (e) {
            this.handleShortcutKeyDigit(e, 3);
          },
          Digit4: function (e) {
            this.handleShortcutKeyDigit(e, 4);
          },
          Digit5: function (e) {
            this.handleShortcutKeyDigit(e, 5);
          },
          Digit6: function (e) {
            this.handleShortcutKeyDigit(e, 6);
          },
          "Control+Space": function (e) {
            this.handleShortcutKeyControlSpace(e);
          },
        };
        setup() {
          if (
            ((this.mode = this.mode || this.options.mode || null),
            (this.date = this.date || this.options.date || null),
            !this.mode &&
              ((this.mode =
                this.getStorage().get("state", "calendarMode") || null),
              this.mode && 0 === this.mode.indexOf("view-")))
          ) {
            let t = this.mode.slice(5),
              e = this.getPreferences().get("calendarViewDataList") || [],
              i = !1;
            e.forEach((e) => {
              e.id === t && (i = !0);
            }),
              i || (this.mode = null),
              this.options.userId && (this.mode = null);
          }
          (this.events["keydown.main"] = (e) => {
            var t = Espo.Utils.getKeyFromKeyEvent(e);
            "function" == typeof this.shortcutKeys[t] &&
              this.shortcutKeys[t].call(this, e.originalEvent);
          }),
            !this.mode ||
            ~this.fullCalendarModeList.indexOf(this.mode) ||
            0 === this.mode.indexOf("view-")
              ? this.setupCalendar()
              : "timeline" === this.mode && this.setupTimeline();
        }
        afterRender() {
          this.$el.focus();
        }
        updateUrl(e) {
          let t = "#Calendar/show";
          (this.mode || this.date) && (t += "/"),
            this.mode && (t += "mode=" + this.mode),
            this.date && (t += "&date=" + this.date),
            this.options.userId &&
              ((t += "&userId=" + this.options.userId),
              this.options.userName &&
                (t +=
                  "&userName=" + encodeURIComponent(this.options.userName))),
            this.getRouter().navigate(t, { trigger: e });
        }
        setupCalendar() {
          var e =
            this.getMetadata().get([
              "clientDefs",
              "Calendar",
              "calendarView",
            ]) || "crm:views/calendar/calendar";
          this.createView(
            "calendar",
            e,
            {
              date: this.date,
              userId: this.options.userId,
              userName: this.options.userName,
              mode: this.mode,
              fullSelector: "#main > .calendar-container",
            },
            (e) => {
              let i = !0;
              this.listenTo(e, "view", (e, t) => {
                (this.date = e),
                  (this.mode = t),
                  i || this.updateUrl(),
                  (i = !1);
              }),
                this.listenTo(e, "change:mode", (e, t) => {
                  (this.mode = e),
                    this.options.userId ||
                      this.getStorage().set("state", "calendarMode", e),
                    t
                      ? this.updateUrl(!0)
                      : (~this.fullCalendarModeList.indexOf(e) ||
                          this.updateUrl(!0),
                        this.$el.focus());
                });
            }
          );
        }
        setupTimeline() {
          var e =
            this.getMetadata().get([
              "clientDefs",
              "Calendar",
              "timelineView",
            ]) || "crm:views/calendar/timeline";
          this.createView(
            "calendar",
            e,
            {
              date: this.date,
              userId: this.options.userId,
              userName: this.options.userName,
              fullSelector: "#main > .calendar-container",
            },
            (e) => {
              let i = !0;
              this.listenTo(e, "view", (e, t) => {
                (this.date = e),
                  (this.mode = t),
                  i || this.updateUrl(),
                  (i = !1);
              }),
                this.listenTo(e, "change:mode", (e) => {
                  (this.mode = e),
                    this.options.userId ||
                      this.getStorage().set("state", "calendarMode", e),
                    this.updateUrl(!0);
                });
            }
          );
        }
        updatePageTitle() {
          this.setPageTitle(this.translate("Calendar", "scopeNames"));
        }
        createCustomView() {
          this.createView(
            "createCustomView",
            "crm:views/calendar/modals/edit-view",
            {},
            (t) => {
              t.render(),
                this.listenToOnce(t, "after:save", (e) => {
                  t.close(),
                    (this.mode = "view-" + e.id),
                    (this.date = null),
                    this.updateUrl(!0);
                });
            }
          );
        }
        editCustomView() {
          var e = this.getCalendarView().viewId;
          e &&
            this.createView(
              "createCustomView",
              "crm:views/calendar/modals/edit-view",
              { id: e },
              (t) => {
                t.render(),
                  this.listenToOnce(t, "after:save", () => {
                    t.close();
                    let e = this.getCalendarView();
                    e.setupMode(), e.reRender();
                  }),
                  this.listenToOnce(t, "after:remove", () => {
                    t.close(),
                      (this.mode = null),
                      (this.date = null),
                      this.updateUrl(!0);
                  });
              }
            );
        }
        getCalendarView() {
          return this.getView("calendar");
        }
        handleShortcutKeyHome(e) {
          e.preventDefault(), this.getCalendarView().actionToday();
        }
        handleShortcutKeyArrowLeft(e) {
          e.preventDefault(), this.getCalendarView().actionPrevious();
        }
        handleShortcutKeyArrowRight(e) {
          e.preventDefault(), this.getCalendarView().actionNext();
        }
        handleShortcutKeyMinus(e) {
          this.getCalendarView().actionZoomOut &&
            (e.preventDefault(), this.getCalendarView().actionZoomOut());
        }
        handleShortcutKeyPlus(e) {
          this.getCalendarView().actionZoomIn &&
            (e.preventDefault(), this.getCalendarView().actionZoomIn());
        }
        handleShortcutKeyDigit(e, t) {
          t = (
            this.getCalendarView().hasView("modeButtons")
              ? this.getCalendarView()
                  .getModeButtonsView()
                  .getModeDataList(!0)
                  .map((e) => e.mode)
              : this.getCalendarView().modeList
          )[t - 1];
          t &&
            (e.preventDefault(),
            t !== this.mode
              ? this.getCalendarView().selectMode(t)
              : this.getCalendarView().actionRefresh());
        }
        handleShortcutKeyControlSpace(e) {
          this.getCalendarView().createEvent &&
            (e.preventDefault(), this.getCalendarView().createEvent());
        }
      }
      e.default = s;
    }
  ),
  define(
    "crm:views/calendar/record/shared-options",
    ["views/record/base"],
    function (e) {
      return e.extend({
        template: "crm:calendar/record/shared-options",
        setup: function () {
          e.prototype.setup.call(this),
            this.createField("users", "crm:views/calendar/fields/users");
        },
      });
    }
  ),
  define(
    "crm:views/calendar/record/edit-view",
    ["views/record/base"],
    function (e) {
      return e.extend({
        template: "crm:calendar/record/edit-view",
        setup: function () {
          e.prototype.setup.call(this),
            this.createField(
              "mode",
              "views/fields/enum",
              {
                options:
                  this.getMetadata().get([
                    "clientDefs",
                    "Calendar",
                    "sharedViewModeList",
                  ]) || [],
                translation: "DashletOptions.options.mode",
              },
              null,
              null,
              { labelText: this.translate("mode", "fields", "DashletOptions") }
            ),
            this.createField(
              "name",
              "views/fields/varchar",
              { required: !0 },
              null,
              null,
              { labelText: this.translate("name", "fields") }
            ),
            this.createField(
              "teams",
              "crm:views/calendar/fields/teams",
              { required: !0 },
              null,
              null,
              {
                labelText: this.translate("teams", "fields"),
                foreignScope: "Team",
              }
            );
        },
      });
    }
  ),
  define(
    "crm:views/calendar/modals/shared-options",
    ["views/modal", "model"],
    function (e, s) {
      return e.extend({
        className: "dialog dialog-record",
        template: "crm:calendar/modals/shared-options",
        buttonList: [
          { name: "save", label: "Save", style: "primary" },
          { name: "cancel", label: "Cancel" },
        ],
        setup: function () {
          var e = this.options.userList || [],
            t = [],
            i = {},
            e =
              (e.forEach((e) => {
                t.push(e.id), (i[e.id] = e.name);
              }),
              new s());
          (e.name = "SharedCalendarOptions"),
            e.set({ usersIds: t, usersNames: i }),
            this.createView(
              "record",
              "crm:views/calendar/record/shared-options",
              { selector: ".record-container", model: e }
            );
        },
        actionSave: function () {
          var t = this.getView("record").fetch(),
            i = [];
          (t.usersIds || []).forEach((e) => {
            i.push({ id: e, name: (t.usersNames || {})[e] || e });
          }),
            this.trigger("save", { userList: i }),
            this.remove();
        },
      });
    }
  ),
  define("crm:views/calendar/modals/edit", ["views/modals/edit"], function (i) {
    return i.extend({
      template: "crm:calendar/modals/edit",
      scopeList: ["Meeting", "Call", "Task"],
      data: function () {
        return {
          scopeList: this.scopeList,
          scope: this.scope,
          isNew: !this.id,
        };
      },
      additionalEvents: {
        'change .scope-switcher input[name="scope"]': function () {
          Espo.Ui.notify(" ... ");
          let i = $('.scope-switcher input[name="scope"]:checked').val();
          (this.scope = i),
            this.getModelFactory().create(this.scope, (e) => {
              e.populateDefaults();
              var t = {
                ...this.getRecordView().fetch(),
                ...this.getRecordView().model.getClonedAttributes(),
              };
              this.filterAttributesForEntityType(t, i),
                e.set(t),
                (this.model = e),
                this.createRecordView(e, (e) => {
                  e.render(), e.notify(!1);
                }),
                this.handleAccess(e);
            });
        },
      },
      filterAttributesForEntityType: function (s, a) {
        this.getHelper()
          .fieldManager.getEntityTypeFieldList(a, { type: "enum" })
          .forEach((t) => {
            if (t in s) {
              let e =
                this.getMetadata().get([
                  "entityDefs",
                  a,
                  "fields",
                  t,
                  "options",
                ]) || [];
              var i = s[t];
              ~e.indexOf(i) || delete s[t];
            }
          });
      },
      createRecordView: function (e, t) {
        this.id ||
          this.dateIsChanged ||
          (this.options.dateStart &&
            this.options.dateEnd &&
            (this.model.set("dateStart", this.options.dateStart),
            this.model.set("dateEnd", this.options.dateEnd)),
          this.options.allDay &&
            (~(
              this.getMetadata().get("clientDefs.Calendar.allDayScopeList") ||
              []
            ).indexOf(this.scope)
              ? (this.model.set("dateStart", null),
                this.model.set("dateEnd", null),
                this.model.set("dateStartDate", null),
                this.model.set("dateEndDate", this.options.dateEndDate),
                this.options.dateEndDate !== this.options.dateStartDate &&
                  this.model.set("dateStartDate", this.options.dateStartDate))
              : this.getMetadata().get([
                  "entityDefs",
                  this.scope,
                  "fields",
                  "dateStartDate",
                ])
              ? (this.model.set("dateStart", null),
                this.model.set("dateEnd", null),
                this.model.set("dateStartDate", this.options.dateStartDate),
                this.model.set("dateEndDate", this.options.dateEndDate),
                this.model.set("isAllDay", !0))
              : (this.model.set("isAllDay", !1),
                this.model.set("dateStartDate", null),
                this.model.set("dateEndDate", null)))),
          this.listenTo(this.model, "change:dateStart", (e, t, i) => {
            i.ui && (this.dateIsChanged = !0);
          }),
          this.listenTo(this.model, "change:dateEnd", (e, t, i) => {
            (i.ui || i.updatedByDuration) && (this.dateIsChanged = !0);
          }),
          i.prototype.createRecordView.call(this, e, t);
      },
      handleAccess: function (e) {
        (this.id && !this.getAcl().checkModel(e, "edit")) ||
        (!this.id && !this.getAcl().checkModel(e, "create"))
          ? (this.hideButton("save"),
            this.hideButton("fullForm"),
            this.$el.find('button[data-name="save"]').addClass("hidden"),
            this.$el.find('button[data-name="fullForm"]').addClass("hidden"))
          : (this.showButton("save"), this.showButton("fullForm")),
          this.getAcl().checkModel(e, "delete")
            ? this.showButton("remove")
            : this.hideButton("remove");
      },
      afterRender: function () {
        var e;
        i.prototype.afterRender.call(this),
          !this.hasView("edit") ||
            ((e = this.getView("edit").model) && this.handleAccess(e));
      },
      setup: function () {
        if (
          ((this.events = { ...this.additionalEvents, ...this.events }),
          (this.scopeList = Espo.Utils.clone(
            this.options.scopeList || this.scopeList
          )),
          (this.enabledScopeList =
            this.options.enabledScopeList || this.scopeList),
          !this.options.id && !this.options.scope)
        ) {
          var t = [],
            e =
              (this.scopeList.forEach((e) => {
                this.getAcl().check(e, "create") &&
                  ~this.enabledScopeList.indexOf(e) &&
                  t.push(e);
              }),
              (this.scopeList = t)[0]);
          if (
            (e && ~this.scopeList.indexOf(e)
              ? (this.options.scope = e)
              : (this.options.scope = this.scopeList[0] || null),
            0 === this.scopeList.length)
          )
            return void this.remove();
        }
        i.prototype.setup.call(this),
          this.id ||
            (this.$header = $("<a>")
              .attr("title", this.translate("Full Form"))
              .attr("role", "button")
              .attr("data-action", "fullForm")
              .addClass("action")
              .text(this.translate("Create", "labels", "Calendar"))),
          this.id &&
            this.buttonList.splice(1, 0, {
              name: "remove",
              text: this.translate("Remove"),
            }),
          this.once("after:save", () => {
            this.$el.find(".scope-switcher").remove();
          });
      },
      actionRemove: function () {
        let t = this.getView("edit").model;
        this.confirm(
          this.translate("removeRecordConfirmation", "messages"),
          () => {
            let e = this.dialog.$el.find(".modal-footer button");
            e.addClass("disabled"),
              t
                .destroy()
                .then(() => {
                  this.trigger("after:destroy", t), this.dialog.close();
                })
                .catch(() => {
                  e.removeClass("disabled");
                });
          }
        );
      },
    });
  }),
  define(
    "crm:views/calendar/modals/edit-view",
    ["views/modal", "model"],
    function (e, n) {
      return e.extend({
        templateContent:
          '<div class="panel panel-default no-side-margin"><div class="panel-body"><div class="record-container">{{{record}}}</div></div></div>',
        className: "dialog dialog-record",
        buttonList: [{ name: "cancel", label: "Cancel" }],
        setup: function () {
          var t,
            i = this.options.id,
            e =
              ((this.isNew = !i),
              this.getPreferences().get("calendarViewDataList") || []),
            s =
              (this.isNew
                ? this.buttonList.unshift({
                    name: "save",
                    label: "Create",
                    style: "danger",
                  })
                : (this.buttonList.unshift({ name: "remove", label: "Remove" }),
                  this.buttonList.unshift({
                    name: "save",
                    label: "Save",
                    style: "primary",
                  })),
              new n()),
            a = ((s.name = "CalendarView"), {});
          this.isNew
            ? ((a.name = this.translate("Shared", "labels", "Calendar")),
              (t = 0),
              e.forEach((e) => {
                0 === e.name.indexOf(a.name) && t++;
              }),
              t && (a.name += " " + t),
              (a.id = i),
              (a.teamsIds = this.getUser().get("teamsIds") || []),
              (a.teamsNames = this.getUser().get("teamsNames") || {}))
            : e.forEach((e) => {
                i === e.id &&
                  ((a.teamsIds = e.teamIdList || []),
                  (a.teamsNames = e.teamNames || {}),
                  (a.id = e.id),
                  (a.name = e.name),
                  (a.mode = e.mode));
              }),
            s.set(a),
            this.createView("record", "crm:views/calendar/record/edit-view", {
              selector: ".record-container",
              model: s,
            });
        },
        actionSave: function () {
          var i,
            s,
            e = this.getView("record").fetch();
          this.getView("record").model.set(e),
            this.getView("record").validate() ||
              (this.disableButton("save"),
              this.disableButton("remove"),
              (i = this.getPreferences().get("calendarViewDataList") || []),
              (s = {
                name: e.name,
                teamIdList: e.teamsIds,
                teamNames: e.teamsNames,
                mode: e.mode,
              }),
              this.isNew
                ? ((s.id = Math.random().toString(36).substr(2, 10)), i.push(s))
                : ((s.id = this.getView("record").model.id),
                  i.forEach((e, t) => {
                    e.id === s.id && (i[t] = s);
                  })),
              Espo.Ui.notify(this.translate("saving", "messages")),
              this.getPreferences()
                .save({ calendarViewDataList: i }, { patch: !0 })
                .then(() => {
                  Espo.Ui.notify(!1),
                    this.trigger("after:save", s),
                    this.remove();
                })
                .catch(() => {
                  this.enableButton("remove"), this.enableButton("save");
                }));
        },
        actionRemove: function () {
          this.confirm(this.translate("confirmation", "messages"), () => {
            this.disableButton("save"), this.disableButton("remove");
            var t,
              i = this.options.id;
            i &&
              ((t = []),
              (this.getPreferences().get("calendarViewDataList") || []).forEach(
                (e) => {
                  e.id !== i && t.push(e);
                }
              ),
              Espo.Ui.notify(" ... "),
              this.getPreferences()
                .save({ calendarViewDataList: t }, { patch: !0 })
                .then(() => {
                  Espo.Ui.notify(!1),
                    this.trigger("after:remove"),
                    this.remove();
                })
                .catch(() => {
                  this.enableButton("remove"), this.enableButton("save");
                }));
          });
        },
      });
    }
  ),
  define(
    "modules/crm/views/calendar/fields/users",
    ["exports", "views/fields/link-multiple"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        foreignScope = "User";
        sortable = !0;
        getSelectBoolFilterList() {
          if ("team" === this.getAcl().getPermissionLevel("userPermission"))
            return ["onlyMyTeam"];
        }
        getSelectPrimaryFilterName() {
          return "active";
        }
      }
      e.default = s;
    }
  ),
  define(
    "crm:views/calendar/fields/teams",
    ["views/fields/link-multiple"],
    function (e) {
      return e.extend({
        foreignScope: "Team",
        getSelectBoolFilterList: function () {
          if ("team" === this.getAcl().get("userPermission")) return ["onlyMy"];
        },
      });
    }
  ),
  define(
    "crm:views/admin/entity-manager/fields/status-list",
    ["views/fields/multi-enum"],
    function (e) {
      return e.extend({
        setupOptions: function () {
          var e = this.model.get("name");
          (this.params.options =
            Espo.Utils.clone(
              this.getMetadata().get([
                "entityDefs",
                e,
                "fields",
                "status",
                "options",
              ])
            ) || []),
            (this.params.translation = e + ".options.status");
        },
      });
    }
  ),
  define("crm:views/activities/list", ["views/list-related"], function (e) {
    return e.extend({
      createButton: !1,
      unlinkDisabled: !0,
      filtersDisabled: !0,
      setup: function () {
        (this.rowActionsView = "views/record/row-actions/default"),
          e.prototype.setup.call(this),
          (this.type = this.options.type);
      },
      getHeader: function () {
        var e = this.model.get("name") || this.model.id,
          t = "#" + this.scope + "/view/" + this.model.id;
        let i = $("<a>")
          .attr("href", t)
          .addClass("font-size-flexible title")
          .text(e);
        this.model.get("deleted") && i.css("text-decoration", "line-through");
        (t = this.getHelper().getScopeColorIconHtml(this.foreignScope)),
          (e = this.getLanguage().translate(this.scope, "scopeNamesPlural"));
        let s = $("<span>").text(e);
        this.rootLinkDisabled ||
          (s = $("<span>").append(
            $("<a>")
              .attr("href", "#" + this.scope)
              .addClass("action")
              .attr("data-action", "navigateToRoot")
              .text(e)
          )),
          t && s.prepend(t);
        (e =
          "history" === this.type
            ? this.translate("History")
            : this.translate("Activities")),
          (t = $("<span>").text(e)),
          (e = $("<span>").text(
            this.translate(this.foreignScope, "scopeNamesPlural")
          ));
        return this.buildHeaderHtml([s, i, t, e]);
      },
      updatePageTitle: function () {
        this.setPageTitle(
          this.translate(this.foreignScope, "scopeNamesPlural")
        );
      },
    });
  }),
  define("crm:views/account/detail", ["views/detail"], function (e) {
    return e.extend({});
  }),
  define(
    "crm:views/account/fields/shipping-address",
    ["views/fields/address"],
    function (t) {
      return t.extend({
        copyFrom: "billingAddress",
        setup: function () {
          t.prototype.setup.call(this),
            (this.attributePartList =
              this.getMetadata().get(["fields", "address", "actualFields"]) ||
              []),
            (this.allAddressAttributeList = []),
            this.attributePartList.forEach((e) => {
              this.allAddressAttributeList.push(
                this.copyFrom + Espo.Utils.upperCaseFirst(e)
              ),
                this.allAddressAttributeList.push(
                  this.name + Espo.Utils.upperCaseFirst(e)
                );
            }),
            this.listenTo(this.model, "change", () => {
              var t = !1;
              this.allAddressAttributeList.forEach((e) => {
                this.model.hasChanged(e) && (t = !0);
              }),
                t &&
                  this.isEditMode() &&
                  this.isRendered() &&
                  this.$copyButton &&
                  (this.toShowCopyButton()
                    ? this.$copyButton.removeClass("hidden")
                    : this.$copyButton.addClass("hidden"));
            });
        },
        afterRender: function () {
          var e;
          t.prototype.afterRender.call(this),
            "edit" === this.mode &&
              ((e = this.translate("Copy Billing", "labels", "Account")),
              (this.$copyButton = $(
                '<button class="btn btn-default btn-sm">' + e + "</button>"
              )),
              this.$copyButton.on("click", () => {
                this.copy(this.copyFrom);
              }),
              this.toShowCopyButton() || this.$copyButton.addClass("hidden"),
              this.$el.append(this.$copyButton));
        },
        copy: function (i) {
          Object.keys(this.getMetadata().get("fields.address.fields")).forEach(
            (e) => {
              var t = this.name + Espo.Utils.upperCaseFirst(e),
                e = i + Espo.Utils.upperCaseFirst(e);
              this.model.set(t, this.model.get(e));
            }
          );
        },
        toShowCopyButton: function () {
          var i = !1,
            s = !1;
          return (
            this.attributePartList.forEach((e) => {
              var t = this.copyFrom + Espo.Utils.upperCaseFirst(e),
                t =
                  (this.model.get(t) && (i = !0),
                  this.name + Espo.Utils.upperCaseFirst(e));
              this.model.get(t) && (s = !0);
            }),
            i && !s
          );
        },
      });
    }
  ),
  define(
    "modules/crm/view-setup-handlers/document/record-list-drag-n-drop",
    ["exports", "underscore", "bullbone"],
    function (e, t, i) {
      "use strict";
      var s;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      function a(e) {
        this.view = e;
      }
      (t = (s = t) && s.__esModule ? s : { default: s }).default.extend(
        a.prototype,
        {
          process: function () {
            this.listenTo(this.view, "after:render", () => this.initDragDrop()),
              this.listenTo(this.view, "remove", () => this.disable());
          },
          disable: function () {
            let e = this.view.$el.parent(),
              t = e.get(0);
            e.off("drop"),
              t &&
                this.onDragoverBind &&
                (t.removeEventListener("dragover", this.onDragoverBind),
                t.removeEventListener("dragenter", this.onDragenterBind),
                t.removeEventListener("dragleave", this.onDragleaveBind));
          },
          initDragDrop: function () {
            this.disable();
            let t = this.view.$el.parent(),
              e = t.get(0);
            t.on("drop", (e) => {
              if (
                (e.preventDefault(),
                e.stopPropagation(),
                (e = e.originalEvent).dataTransfer &&
                  e.dataTransfer.files &&
                  1 === e.dataTransfer.files.length &&
                  this.dropEntered)
              )
                return (
                  this.removeDrop(), void this.create(e.dataTransfer.files[0])
                );
              this.removeDrop(t);
            }),
              (this.dropEntered = !1),
              (this.onDragoverBind = this.onDragover.bind(this)),
              (this.onDragenterBind = this.onDragenter.bind(this)),
              (this.onDragleaveBind = this.onDragleave.bind(this)),
              e.addEventListener("dragover", this.onDragoverBind),
              e.addEventListener("dragenter", this.onDragenterBind),
              e.addEventListener("dragleave", this.onDragleaveBind);
          },
          renderDrop: function () {
            this.dropEntered = !0;
            var e = $('<div class="dd-backdrop">')
              .css("pointer-events", "none")
              .append('<span class="fas fa-paperclip"></span>')
              .append(" ")
              .append(
                $("<span>").text(
                  this.view
                    .getLanguage()
                    .translate("Create Document", "labels", "Document")
                )
              );
            this.view.$el.append(e);
          },
          removeDrop: function () {
            this.view.$el.find("> .dd-backdrop").remove(),
              (this.dropEntered = !1);
          },
          create: function (i) {
            this.view.actionQuickCreate().then((e) => {
              let t = e.getRecordView().getFieldView("file");
              if (!t)
                return (
                  (e = "No 'file' field on the layout."),
                  Espo.Ui.error(e),
                  void console.error(e)
                );
              t.isRendered()
                ? t.uploadFile(i)
                : this.listenToOnce(t, "after:render", () => {
                    t.uploadFile(i);
                  });
            });
          },
          onDragover: function (e) {
            e.preventDefault();
          },
          onDragenter: function (e) {
            e.preventDefault(),
              e.dataTransfer.types &&
                e.dataTransfer.types.length &&
                ~e.dataTransfer.types.indexOf("Files") &&
                (this.dropEntered || this.renderDrop());
          },
          onDragleave: function (t) {
            if ((t.preventDefault(), this.dropEntered)) {
              let e = t.fromElement || t.relatedTarget;
              (e && $.contains(this.view.$el.parent().get(0), e)) ||
                (e &&
                  e.parentNode &&
                  "[object ShadowRoot]" === e.parentNode.toString()) ||
                this.removeDrop();
            }
          },
        }
      ),
        Object.assign(a.prototype, i.Events),
        (e.default = a);
    }
  ),
  define(
    "modules/crm/handlers/task/menu",
    ["exports", "action-handler"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        complete() {
          const e = this.view.model;
          e.save({ status: "Completed" }, { patch: !0 }).then(() => {
            Espo.Ui.success(
              this.view
                .getLanguage()
                .translateOption("Completed", "status", "Task")
            );
          });
        }
        isCompleteAvailable() {
          var e = this.view.model.get("status");
          const t = this.view;
          if (t.getRecordView().isEditMode()) return !1;
          const i =
            this.view
              .getMetadata()
              .get("entityDefs.Task.fields.status.notActualOptions") || [];
          return !i.includes(e);
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/handlers/task/detail-actions",
    ["exports", "action-handler"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        complete() {
          const e = this.view.model;
          e.save({ status: "Completed" }, { patch: !0 }).then(() => {
            Espo.Ui.success(
              this.view
                .getLanguage()
                .translateOption("Completed", "status", "Task")
            );
          });
        }
        isCompleteAvailable() {
          var e = this.view.model.get("status");
          const t =
            this.view
              .getMetadata()
              .get("entityDefs.Task.fields.status.notActualOptions") || [];
          return !t.includes(e);
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/handlers/opportunity/contacts-create",
    ["exports", "handlers/create-related"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        getAttributes(e) {
          const t = {};
          return (
            e.get("accountId") && (t.accountsIds = [e.get("accountId")]),
            Promise.resolve(t)
          );
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/handlers/knowledge-base-article/send-in-email",
    ["exports", "handlers/row-action"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        isAvailable(e, t) {
          return this.view.getAcl().checkScope("Email", "create");
        }
        process(s, e) {
          const a = this.view.getParentView().model,
            t = this.view.getModelFactory(),
            n = this.view.getCollectionFactory();
          Espo.Ui.notify(" ... "),
            s
              .fetch()
              .then(
                () =>
                  new Promise((i) => {
                    a.get("contactsIds") && a.get("contactsIds").length
                      ? n.create("Contact", (e) => {
                          const t = [];
                          (e.url = "Case/" + a.id + "/contacts"),
                            e.fetch().then(() => {
                              e.forEach((e) => {
                                e.id === a.get("contactId")
                                  ? t.unshift(e)
                                  : t.push(e);
                              }),
                                i(t);
                            });
                        })
                      : a.get("accountId")
                      ? t.create("Account", (e) => {
                          (e.id = a.get("accountId")),
                            e.fetch().then(() => i([e]));
                        })
                      : a.get("leadId")
                      ? t.create("Lead", (e) => {
                          (e.id = a.get("leadId")),
                            e.fetch().then(() => i([e]));
                        })
                      : i([]);
                  })
              )
              .then((e) => {
                const i = {
                  parentType: "Case",
                  parentId: a.id,
                  parentName: a.get("name"),
                  name: "[#" + a.get("number") + "]",
                  to: "",
                  cc: "",
                  nameHash: {},
                };
                e.forEach((e, t) => {
                  e.get("emailAddress") &&
                    (0 === t
                      ? (i.to += e.get("emailAddress") + ";")
                      : (i.cc += e.get("emailAddress") + ";"),
                    (i.nameHash[e.get("emailAddress")] = e.get("name")));
                }),
                  Espo.loader.require("crm:knowledge-base-helper", (e) => {
                    const t = new e(this.view.getLanguage());
                    t.getAttributesForEmail(s, i, (e) => {
                      var t =
                        this.view
                          .getMetadata()
                          .get("clientDefs.Email.modalViews.compose") ||
                        "views/modals/compose-email";
                      this.view.createView(
                        "composeEmail",
                        t,
                        {
                          attributes: e,
                          selectTemplateDisabled: !0,
                          signatureDisabled: !0,
                        },
                        (e) => {
                          Espo.Ui.notify(!1),
                            e.render(),
                            this.view.listenToOnce(e, "after:send", () => {
                              a.trigger("after:relate");
                            });
                        }
                      );
                    });
                  });
              })
              .catch(() => {
                Espo.Ui.notify(!1);
              });
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/handlers/knowledge-base-article/move",
    ["exports", "handlers/row-action"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        isAvailable(e, t) {
          return (
            e.collection &&
            "order" === e.collection.orderBy &&
            "asc" === e.collection.order
          );
        }
        process(e, t) {
          "moveToTop" !== t
            ? "moveToBottom" !== t
              ? "moveUp" !== t
                ? "moveDown" === t && this.moveDown(e)
                : this.moveUp(e)
              : this.moveToBottom(e)
            : this.moveToTop(e);
        }
        moveToTop(e) {
          0 !== this.collection.indexOf(e) &&
            (Espo.Ui.notify(" ... "),
            Espo.Ajax.postRequest("KnowledgeBaseArticle/action/moveToTop", {
              id: e.id,
              where: this.collection.getWhere(),
            }).then(() => {
              this.collection.fetch().then(() => Espo.Ui.notify(!1));
            }));
        }
        moveUp(e) {
          0 !== this.collection.indexOf(e) &&
            (Espo.Ui.notify(" ... "),
            Espo.Ajax.postRequest("KnowledgeBaseArticle/action/moveUp", {
              id: e.id,
              where: this.collection.getWhere(),
            }).then(() => {
              this.collection.fetch().then(() => Espo.Ui.notify(!1));
            }));
        }
        moveDown(e) {
          (this.collection.indexOf(e) === this.collection.length - 1 &&
            this.collection.length === this.collection.total) ||
            (Espo.Ui.notify(" ... "),
            Espo.Ajax.postRequest("KnowledgeBaseArticle/action/moveDown", {
              id: e.id,
              where: this.collection.getWhere(),
            }).then(() => {
              this.collection.fetch().then(() => Espo.Ui.notify(!1));
            }));
        }
        moveToBottom(e) {
          (this.collection.indexOf(e) === this.collection.length - 1 &&
            this.collection.length === this.collection.total) ||
            (Espo.Ui.notify(" ... "),
            Espo.Ajax.postRequest("KnowledgeBaseArticle/action/moveToBottom", {
              id: e.id,
              where: this.collection.getWhere(),
            }).then(() => {
              this.collection.fetch().then(() => Espo.Ui.notify(!1));
            }));
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/handlers/case/detail-actions",
    ["exports", "action-handler"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        close() {
          const e = this.view.model;
          e.save({ status: "Closed" }, { patch: !0 }).then(() => {
            Espo.Ui.success(this.view.translate("Closed", "labels", "Case"));
          });
        }
        reject() {
          const e = this.view.model;
          e.save({ status: "Rejected" }, { patch: !0 }).then(() => {
            Espo.Ui.success(this.view.translate("Rejected", "labels", "Case"));
          });
        }
        isCloseAvailable() {
          return this.isStatusAvailable("Closed");
        }
        isRejectAvailable() {
          return this.isStatusAvailable("Rejected");
        }
        isStatusAvailable(e) {
          const t = this.view.model,
            i = this.view.getAcl(),
            s = this.view.getMetadata(),
            a = s.get("entityDefs.Case.fields.status.notActualOptions") || [];
          if (a.includes(t.get("status"))) return !1;
          if (!i.check(t, "edit")) return !1;
          if (!i.checkField(t.entityType, "status", "edit")) return !1;
          const n =
            s.get(["entityDefs", "Case", "fields", "status", "options"]) || [];
          return !!n.includes(e);
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/handlers/campaign/mass-emails-create",
    ["exports", "handlers/create-related"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        getAttributes(e) {
          return Promise.resolve({
            name: e.get("name") + " " + this.viewHelper.dateTime.getToday(),
          });
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/controllers/unsubscribe",
    ["exports", "controller"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        actionUnsubscribe(e) {
          var t = e.view || "crm:views/campaign/unsubscribe";
          this.entire(
            t,
            { actionData: e.actionData, template: e.template },
            (e) => {
              e.render();
            }
          );
        }
        actionSubscribeAgain(e) {
          var t = e.view || "crm:views/campaign/subscribe-again";
          this.entire(
            t,
            { actionData: e.actionData, template: e.template },
            (e) => {
              e.render();
            }
          );
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/controllers/tracking-url",
    ["exports", "controller"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        actionDisplayMessage(e) {
          var t = e.view || "crm:views/campaign/tracking-url";
          this.entire(t, { message: e.message, template: e.template }, (e) => {
            e.render();
          });
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/controllers/lead",
    ["exports", "controllers/record"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        actionConvert(e) {
          this.main("crm:views/lead/convert", { id: e });
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/controllers/event-confirmation",
    ["exports", "controller"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        actionConfirmEvent(e) {
          var t =
            this.getMetadata().get([
              "clientDefs",
              "EventConfirmation",
              "confirmationView",
            ]) || "crm:views/event-confirmation/confirmation";
          this.entire(t, { actionData: e }, (e) => {
            e.render();
          });
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/controllers/calendar",
    ["exports", "controller"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        checkAccess() {
          return !!this.getAcl().check("Calendar");
        }
        actionShow(e) {
          this.actionIndex(e);
        }
        actionIndex(e) {
          this.handleCheckAccess(""),
            this.main("crm:views/calendar/calendar-page", {
              date: e.date,
              mode: e.mode,
              userId: e.userId,
              userName: e.userName,
            });
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/controllers/activities",
    ["exports", "controller"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        checkAccess(e) {
          return !!this.getAcl().check("Activities");
        }
        actionActivities(e) {
          this.processList(
            "activities",
            e.entityType,
            e.id,
            e.targetEntityType
          );
        }
        actionHistory(e) {
          this.processList("history", e.entityType, e.id, e.targetEntityType);
        }
        processList(t, i, s, a) {
          let n;
          this.modelFactory
            .create(i)
            .then((e) => (((n = e).id = s), n.fetch({ main: !0 })))
            .then(() => this.collectionFactory.create(a))
            .then((e) => {
              (e.url =
                "Activities/" +
                n.entityType +
                "/" +
                s +
                "/" +
                t +
                "/list/" +
                a),
                this.main("crm:views/activities/list", {
                  scope: i,
                  model: n,
                  collection: e,
                  link: t + "_" + a,
                  type: t,
                });
            });
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/acl-portal/document",
    ["exports", "acl-portal"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        checkModelEdit(e, t, i) {
          return !!this.checkModel(e, t, "delete", i) || "account" === t.edit;
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/acl-portal/contact",
    ["exports", "acl-portal"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        checkIsOwnContact(e) {
          var t = this.getUser().get("contactId");
          return !!t && t === e.id;
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/acl-portal/account",
    ["exports", "acl-portal"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        checkInAccount(e) {
          const t = this.getUser().getLinkMultipleIdList("accounts");
          return !!t.length && !!~t.indexOf(e.id);
        }
      }
      e.default = s;
    }
  ),
  define("modules/crm/acl/mass-email", ["exports", "acl"], function (e, t) {
    "use strict";
    var i;
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    class s extends (t = (i = t) && i.__esModule ? i : { default: i }).default {
      checkIsOwner(e) {
        return !!e.has("campaignId") || super.checkIsOwner(e);
      }
      checkInTeam(e) {
        return !!e.has("campaignId") || super.checkInTeam(e);
      }
    }
    e.default = s;
  }),
  define(
    "modules/crm/acl/campaign-tracking-url",
    ["exports", "acl"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {
        checkIsOwner(e) {
          return !!e.has("campaignId");
        }
        checkInTeam(e) {
          return !!e.has("campaignId");
        }
      }
      e.default = s;
    }
  ),
  define(
    "modules/crm/acl/call",
    ["exports", "modules/crm/acl/meeting"],
    function (e, t) {
      "use strict";
      var i;
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      class s extends (t = (i = t) && i.__esModule ? i : { default: i })
        .default {}
      e.default = s;
    }
  );
//# sourceMappingURL=espo-crm.js.map

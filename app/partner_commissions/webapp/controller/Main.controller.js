sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Item",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/ComboBox",
    "sap/m/DatePicker",
    "sap/m/CheckBox",
    "sap/m/HBox",
    "sap/m/VBox",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/ui/layout/form/SimpleForm"
], (Controller, MessageToast, MessageBox, Item, JSONModel, Column, ColumnListItem, Text, Label, Input, ComboBox, DatePicker, CheckBox, HBox, VBox, Button, Dialog, SimpleForm) => {
    "use strict";

    return Controller.extend("partnercommissions.controller.Main", {

        /**
         * Map of fieldId to control type for dynamic form/table creation
         */
        _fieldTypeMap: {
            id: "display",
            partnerName: "input",
            partnerType: "combobox",
            companyRegNumber: "input",
            effectiveStartDate: "date",
            effectiveEndDate: "date",
            emailId: "input",
            country: "input",
            positionName: "input",
            salary: "number",
            unitTypeForSalary: "input",
            hireDate: "date",
            terminationDate: "date",
            userName: "input",
            userId: "input",
            genericAttribute1: "input", genericAttribute2: "input", genericAttribute3: "input",
            genericAttribute4: "input", genericAttribute5: "input", genericAttribute6: "input",
            genericAttribute7: "input", genericAttribute8: "input", genericAttribute9: "input",
            genericAttribute10: "input", genericAttribute11: "input", genericAttribute12: "input",
            genericAttribute13: "input", genericAttribute14: "input", genericAttribute15: "input",
            genericAttribute16: "input",
            genericNumber1: "number", genericNumber2: "number", genericNumber3: "number",
            genericNumber4: "number", genericNumber5: "number", genericNumber6: "number",
            genericDate1: "date", genericDate2: "date", genericDate3: "date",
            genericDate4: "date", genericDate5: "date", genericDate6: "date",
            genericBoolean1: "boolean", genericBoolean2: "boolean", genericBoolean3: "boolean",
            genericBoolean4: "boolean", genericBoolean5: "boolean", genericBoolean6: "boolean"
        },

        /**
         * Default field customization entries
         */
        _defaultFieldCustomizations: [
            { position: 1, fieldId: "id", columnName: "ID", defaultLabel: "ID", customLabel: "", enabled: true, fixed: true },
            { position: 2, fieldId: "partnerName", columnName: "Partner Name", defaultLabel: "Partner Name", customLabel: "", enabled: true, fixed: true },
            { position: 3, fieldId: "partnerType", columnName: "Partner Type", defaultLabel: "Partner Type", customLabel: "", enabled: true, fixed: true },
            { position: 4, fieldId: "companyRegNumber", columnName: "Company Registration Number", defaultLabel: "Company Registration Number", customLabel: "", enabled: true, fixed: true },
            { position: 5, fieldId: "effectiveStartDate", columnName: "Effective Start Date", defaultLabel: "Effective Start Date", customLabel: "", enabled: true, fixed: true },
            { position: 6, fieldId: "effectiveEndDate", columnName: "Effective End Date", defaultLabel: "Effective End Date", customLabel: "", enabled: true, fixed: true },
            { position: 7, fieldId: "emailId", columnName: "Email ID", defaultLabel: "Email ID", customLabel: "", enabled: true, fixed: true },
            { position: 8, fieldId: "country", columnName: "Country", defaultLabel: "Country", customLabel: "", enabled: true, fixed: true },
            { position: 9, fieldId: "positionName", columnName: "Position Name", defaultLabel: "Position Name", customLabel: "", enabled: false, fixed: false },
            { position: 10, fieldId: "salary", columnName: "Salary", defaultLabel: "Salary", customLabel: "", enabled: false, fixed: false },
            { position: 11, fieldId: "unitTypeForSalary", columnName: "Unit Type for Salary", defaultLabel: "Unit Type for Salary", customLabel: "", enabled: false, fixed: false },
            { position: 12, fieldId: "hireDate", columnName: "Hire Date", defaultLabel: "Hire Date", customLabel: "", enabled: false, fixed: false },
            { position: 13, fieldId: "terminationDate", columnName: "Termination Date", defaultLabel: "Termination Date", customLabel: "", enabled: false, fixed: false },
            { position: 14, fieldId: "userName", columnName: "User Name", defaultLabel: "User Name", customLabel: "", enabled: false, fixed: false },
            { position: 15, fieldId: "userId", columnName: "User ID", defaultLabel: "User ID", customLabel: "", enabled: false, fixed: false },
            { position: 16, fieldId: "genericAttribute1", columnName: "Generic Attribute 1", defaultLabel: "Generic Attribute 1", customLabel: "", enabled: false, fixed: false },
            { position: 17, fieldId: "genericAttribute2", columnName: "Generic Attribute 2", defaultLabel: "Generic Attribute 2", customLabel: "", enabled: false, fixed: false },
            { position: 18, fieldId: "genericAttribute3", columnName: "Generic Attribute 3", defaultLabel: "Generic Attribute 3", customLabel: "", enabled: false, fixed: false },
            { position: 19, fieldId: "genericAttribute4", columnName: "Generic Attribute 4", defaultLabel: "Generic Attribute 4", customLabel: "", enabled: false, fixed: false },
            { position: 20, fieldId: "genericAttribute5", columnName: "Generic Attribute 5", defaultLabel: "Generic Attribute 5", customLabel: "", enabled: false, fixed: false },
            { position: 21, fieldId: "genericAttribute6", columnName: "Generic Attribute 6", defaultLabel: "Generic Attribute 6", customLabel: "", enabled: false, fixed: false },
            { position: 22, fieldId: "genericAttribute7", columnName: "Generic Attribute 7", defaultLabel: "Generic Attribute 7", customLabel: "", enabled: false, fixed: false },
            { position: 23, fieldId: "genericAttribute8", columnName: "Generic Attribute 8", defaultLabel: "Generic Attribute 8", customLabel: "", enabled: false, fixed: false },
            { position: 24, fieldId: "genericAttribute9", columnName: "Generic Attribute 9", defaultLabel: "Generic Attribute 9", customLabel: "", enabled: false, fixed: false },
            { position: 25, fieldId: "genericAttribute10", columnName: "Generic Attribute 10", defaultLabel: "Generic Attribute 10", customLabel: "", enabled: false, fixed: false },
            { position: 26, fieldId: "genericAttribute11", columnName: "Generic Attribute 11", defaultLabel: "Generic Attribute 11", customLabel: "", enabled: false, fixed: false },
            { position: 27, fieldId: "genericAttribute12", columnName: "Generic Attribute 12", defaultLabel: "Generic Attribute 12", customLabel: "", enabled: false, fixed: false },
            { position: 28, fieldId: "genericAttribute13", columnName: "Generic Attribute 13", defaultLabel: "Generic Attribute 13", customLabel: "", enabled: false, fixed: false },
            { position: 29, fieldId: "genericAttribute14", columnName: "Generic Attribute 14", defaultLabel: "Generic Attribute 14", customLabel: "", enabled: false, fixed: false },
            { position: 30, fieldId: "genericAttribute15", columnName: "Generic Attribute 15", defaultLabel: "Generic Attribute 15", customLabel: "", enabled: false, fixed: false },
            { position: 31, fieldId: "genericAttribute16", columnName: "Generic Attribute 16", defaultLabel: "Generic Attribute 16", customLabel: "", enabled: false, fixed: false },
            { position: 32, fieldId: "genericNumber1", columnName: "Generic Number 1", defaultLabel: "Generic Number 1", customLabel: "", enabled: false, fixed: false },
            { position: 33, fieldId: "genericNumber2", columnName: "Generic Number 2", defaultLabel: "Generic Number 2", customLabel: "", enabled: false, fixed: false },
            { position: 34, fieldId: "genericNumber3", columnName: "Generic Number 3", defaultLabel: "Generic Number 3", customLabel: "", enabled: false, fixed: false },
            { position: 35, fieldId: "genericNumber4", columnName: "Generic Number 4", defaultLabel: "Generic Number 4", customLabel: "", enabled: false, fixed: false },
            { position: 36, fieldId: "genericNumber5", columnName: "Generic Number 5", defaultLabel: "Generic Number 5", customLabel: "", enabled: false, fixed: false },
            { position: 37, fieldId: "genericNumber6", columnName: "Generic Number 6", defaultLabel: "Generic Number 6", customLabel: "", enabled: false, fixed: false },
            { position: 38, fieldId: "genericDate1", columnName: "Generic Date 1", defaultLabel: "Generic Date 1", customLabel: "", enabled: false, fixed: false },
            { position: 39, fieldId: "genericDate2", columnName: "Generic Date 2", defaultLabel: "Generic Date 2", customLabel: "", enabled: false, fixed: false },
            { position: 40, fieldId: "genericDate3", columnName: "Generic Date 3", defaultLabel: "Generic Date 3", customLabel: "", enabled: false, fixed: false },
            { position: 41, fieldId: "genericDate4", columnName: "Generic Date 4", defaultLabel: "Generic Date 4", customLabel: "", enabled: false, fixed: false },
            { position: 42, fieldId: "genericDate5", columnName: "Generic Date 5", defaultLabel: "Generic Date 5", customLabel: "", enabled: false, fixed: false },
            { position: 43, fieldId: "genericDate6", columnName: "Generic Date 6", defaultLabel: "Generic Date 6", customLabel: "", enabled: false, fixed: false },
            { position: 44, fieldId: "genericBoolean1", columnName: "Generic Boolean 1", defaultLabel: "Generic Boolean 1", customLabel: "", enabled: false, fixed: false },
            { position: 45, fieldId: "genericBoolean2", columnName: "Generic Boolean 2", defaultLabel: "Generic Boolean 2", customLabel: "", enabled: false, fixed: false },
            { position: 46, fieldId: "genericBoolean3", columnName: "Generic Boolean 3", defaultLabel: "Generic Boolean 3", customLabel: "", enabled: false, fixed: false },
            { position: 47, fieldId: "genericBoolean4", columnName: "Generic Boolean 4", defaultLabel: "Generic Boolean 4", customLabel: "", enabled: false, fixed: false },
            { position: 48, fieldId: "genericBoolean5", columnName: "Generic Boolean 5", defaultLabel: "Generic Boolean 5", customLabel: "", enabled: false, fixed: false },
            { position: 49, fieldId: "genericBoolean6", columnName: "Generic Boolean 6", defaultLabel: "Generic Boolean 6", customLabel: "", enabled: false, fixed: false }
        ],

        /**
         * Map of side nav keys to page IDs in NavContainer
         */
        _navKeyToPageId: {
            dashboard: "dashboardPage",
            partnerOnboarding: "partnerOnboardingPage",
            partnerAnalytics: "partnerAnalyticsPage",
            incentiveProgramSetup: "incentiveProgramSetupPage",
            riskScreening: "riskScreeningPage",
            paymentScheduleSetup: "paymentScheduleSetupPage",
            partnerHierarchySetup: "partnerHierarchySetupPage",
            partnerAssignment: "partnerMappingsPage",
            dealRegistration: "dealRegistrationPage",
            paymentApproval: "paymentApprovalPage",
            configDataSources: "configDataSourcesPage",
            configCustomizations: "configCustomizationsPage",
            settings: "settingsPage"
        },

        onInit() {
            this.getView().setModel(new JSONModel([]), "partners");
            this.getView().setModel(new JSONModel([]), "columnSettings");
            this.getView().setModel(new JSONModel([]), "activePartnerTypes");
            this.getView().setModel(new JSONModel([]), "incentiveTypes");
            this.getView().setModel(new JSONModel([]), "incentivePrograms");
            this.getView().setModel(new JSONModel([]), "planNames");
            this.getView().setModel(new JSONModel([]), "activeIncentiveTypes");
            this.getView().setModel(new JSONModel([]), "eligibleTiers");
            this.getView().setModel(new JSONModel([]), "eligibleTiersConfig");
            this.getView().setModel(new JSONModel([]), "partnerAssignments");
            this.getView().setModel(new JSONModel([]), "onboardedPartners");
            this.getView().setModel(new JSONModel([]), "fieldCustomizations");
            this.getView().setModel(new JSONModel([]), "partnerTypes");
            this.getView().setModel(new JSONModel([]), "periodsData");
            this.getView().setModel(new JSONModel([]), "productsData");
            this.getView().setModel(new JSONModel([]), "creditTypesData");
            this.getView().setModel(new JSONModel([]), "analyticsRawData");
            this.getView().setModel(new JSONModel([]), "analyticsChartData");
            this.getView().setModel(new JSONModel({
                chartType: "column",
                dimension: "PRODUCTID",
                measure: "TransactionCount",
                topN: "10"
            }), "chartConfig");

            this._loadChartJS();
            this._loadPeriods();
            this._loadProducts();
            this._loadCreditTypes();
            this._loadPlanNames();
            this._loadIncentiveTypes();
            this._loadEligibleTiers();
            this._loadFieldCustomizations();
            this._loadPartnerTypes();

            // Navigate to Partner Onboarding by default
            var oNavContainer = this.byId("mainContent");
            oNavContainer.to(this.byId("partnerOnboardingPage"));
        },

        /**
         * Toggle the side navigation between expanded and collapsed
         */
        onToggleSideNav() {
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        /**
         * Handle side navigation item selection
         */
        onSideNavItemSelect(oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            var sPageId = this._navKeyToPageId[sKey];
            if (sPageId) {
                var oNavContainer = this.byId("mainContent");
                oNavContainer.to(this.byId(sPageId));

                if (sKey === "configCustomizations") {
                    this._loadFieldCustomizations();
                }
            }
        },

        // ========== Partner Onboarding ==========

        /**
         * Get active (enabled) field customizations sorted by position
         */
        _getActiveFieldCustomizations() {
            var aCustomizations = this.getView().getModel("fieldCustomizations").getData();
            return aCustomizations
                .filter(function (c) { return c.enabled; })
                .sort(function (a, b) { return a.position - b.position; });
        },

        /**
         * Build the partner table columns based on enabled field customizations
         */
        _buildPartnerTable() {
            var oTable = this.byId("tblPartners");
            if (!oTable) { return; }

            oTable.removeAllColumns();
            oTable.unbindAggregation("items");

            var aActive = this._getActiveFieldCustomizations();

            // Initialize column settings – first 8 visible by default
            var aColumnSettings = aActive.map(function (c) {
                return {
                    fieldId: c.fieldId,
                    label: c.customLabel && c.customLabel.trim() !== "" ? c.customLabel : c.defaultLabel,
                    visible: c.position <= 8,
                    position: c.position
                };
            });
            this.getView().getModel("columnSettings").setData(aColumnSettings);

            // Create columns and cell templates
            var aCells = [];
            var that = this;
            aColumnSettings.forEach(function (oSetting) {
                oTable.addColumn(new Column({
                    header: new Text({ text: oSetting.label }),
                    visible: oSetting.visible
                }));
                aCells.push(new Text({ text: "{partners>" + oSetting.fieldId + "}" }));
            });

            // Actions column
            oTable.addColumn(new Column({
                header: new Text({ text: "Actions" }),
                hAlign: "Center",
                width: "8rem"
            }));
            aCells.push(new HBox({
                justifyContent: "Center",
                items: [
                    new Button({ icon: "sap-icon://edit", type: "Transparent", press: that.onEditPartner.bind(that) }),
                    new Button({ icon: "sap-icon://delete", type: "Transparent", press: that.onDeletePartner.bind(that) })
                ]
            }));

            // Bind items
            oTable.bindAggregation("items", {
                path: "partners>/",
                template: new ColumnListItem({ cells: aCells })
            });

            this._updatePartnerTableTitle();
        },

        /**
         * Update the partner table title with current count
         */
        _updatePartnerTableTitle() {
            var oTitle = this.byId("partnerTableTitle");
            if (oTitle) {
                var iCount = this.getView().getModel("partners").getData().length;
                oTitle.setText("Partners (" + iCount + ")");
            }
        },

        /**
         * Open the Register a New Partner dialog
         */
        onRegisterPartner() {
            var that = this;
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var aActive = this._getActiveFieldCustomizations();
            var aActivePartnerTypes = this.getView().getModel("activePartnerTypes").getData();

            var aFormContent = [];
            this._registrationControls = {};

            aActive.forEach(function (oField) {
                var sLabel = oField.customLabel && oField.customLabel.trim() !== "" ? oField.customLabel : oField.defaultLabel;
                var sType = that._fieldTypeMap[oField.fieldId] || "input";

                // Auto-generated ID – skip in form
                if (sType === "display") { return; }

                var bRequired = oField.fixed === true && oField.fieldId !== "id";
                aFormContent.push(new Label({ text: sLabel, required: bRequired }));

                var oControl;
                if (sType === "combobox") {
                    oControl = new ComboBox({ width: "100%" });
                    if (oField.fieldId === "partnerType") {
                        aActivePartnerTypes.forEach(function (oType) {
                            oControl.addItem(new Item({ key: oType.partnerType, text: oType.partnerType }));
                        });
                    }
                } else if (sType === "date") {
                    oControl = new DatePicker({ width: "100%", valueFormat: "yyyy-MM-dd", displayFormat: "dd/MM/yyyy" });
                } else if (sType === "number") {
                    oControl = new Input({ type: "Number", width: "100%" });
                } else if (sType === "boolean") {
                    oControl = new CheckBox();
                } else {
                    oControl = new Input({ width: "100%" });
                }

                that._registrationControls[oField.fieldId] = oControl;
                aFormContent.push(oControl);
            });

            var oForm = new SimpleForm({
                editable: true,
                layout: "ColumnLayout",
                columnsXL: 3, columnsL: 3, columnsM: 2,
                content: aFormContent
            });

            this._registerDialog = new Dialog({
                title: oBundle.getText("dlgRegisterPartnerTitle"),
                contentWidth: "75rem",
                stretch: sap.ui.Device.system.phone,
                content: [oForm],
                beginButton: new Button({
                    text: oBundle.getText("btnSubmit"),
                    type: "Emphasized",
                    press: function () { that._onSubmitNewPartner(); }
                }),
                endButton: new Button({
                    text: oBundle.getText("btnCancel"),
                    press: function () { that._registerDialog.close(); }
                }),
                afterClose: function () {
                    that._registerDialog.destroy();
                    that._registerDialog = null;
                    that._registrationControls = null;
                }
            });

            this.getView().addDependent(this._registerDialog);
            this._registerDialog.open();
        },

        /**
         * Submit the registration form
         */
        _onSubmitNewPartner() {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var aActive = this._getActiveFieldCustomizations();
            var oNewPartner = {};
            var that = this;

            // Auto-generate ID
            var aPartners = this.getView().getModel("partners").getData();
            oNewPartner.id = (aPartners.length + 1).toString();

            // Collect values and validate required fields
            var bValid = true;
            aActive.forEach(function (oField) {
                if (oField.fieldId === "id") { return; }
                var oControl = that._registrationControls[oField.fieldId];
                if (!oControl) { return; }

                var sType = that._fieldTypeMap[oField.fieldId] || "input";
                var sValue;
                if (sType === "combobox") {
                    sValue = oControl.getSelectedKey();
                } else if (sType === "boolean") {
                    sValue = oControl.getSelected();
                } else {
                    sValue = oControl.getValue();
                }

                oNewPartner[oField.fieldId] = sValue;

                if (oField.fixed && oField.fieldId !== "id" && !sValue && sValue !== false) {
                    bValid = false;
                    if (oControl.setValueState) {
                        oControl.setValueState("Error");
                        oControl.setValueStateText(oBundle.getText("msgRequiredField"));
                    }
                } else {
                    if (oControl.setValueState) {
                        oControl.setValueState("None");
                    }
                }
            });

            if (!bValid) {
                MessageToast.show(oBundle.getText("msgFillRequiredFields"));
                return;
            }

            aPartners.push(oNewPartner);
            this.getView().getModel("partners").setData(aPartners);
            this._updatePartnerTableTitle();
            this._registerDialog.close();
            MessageToast.show(oBundle.getText("msgPartnerRegistered"));
        },

        /**
         * Delete a partner from the local model with confirmation
         */
        onDeletePartner(oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getParent().getParent().getBindingContext("partners");
            var sPath = oContext.getPath();
            var iIndex = parseInt(sPath.substring(1), 10);
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var that = this;

            MessageBox.confirm(oBundle.getText("msgConfirmDeletePartner"), {
                title: oBundle.getText("dlgConfirmTitle"),
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        var oModel = that.getView().getModel("partners");
                        var aData = oModel.getData();
                        aData.splice(iIndex, 1);
                        oModel.setData(aData);
                        that._updatePartnerTableTitle();
                        MessageToast.show(oBundle.getText("msgPartnerDeleted"));
                    }
                }
            });
        },

        /**
         * Edit partner placeholder
         */
        onEditPartner() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgEditPlaceholder"));
        },

        /**
         * Open column settings dialog
         */
        onOpenColumnSettings() {
            var that = this;
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var aColumnSettings = this.getView().getModel("columnSettings").getData();

            if (!aColumnSettings || aColumnSettings.length === 0) {
                MessageToast.show(oBundle.getText("msgNoColumnsToConfig"));
                return;
            }

            var oVBox = new VBox({ class: "sapUiSmallMargin" });
            this._settingsCheckBoxes = [];

            aColumnSettings.forEach(function (oSetting, iIndex) {
                var oCb = new CheckBox({
                    text: oSetting.label,
                    selected: oSetting.visible
                });
                oCb.data("index", iIndex);
                that._settingsCheckBoxes.push(oCb);
                oVBox.addItem(oCb);
            });

            this._settingsDialog = new Dialog({
                title: oBundle.getText("dlgColumnSettingsTitle"),
                contentWidth: "400px",
                content: [oVBox],
                beginButton: new Button({
                    text: oBundle.getText("btnApply"),
                    type: "Emphasized",
                    press: function () { that._onApplyColumnSettings(); }
                }),
                endButton: new Button({
                    text: oBundle.getText("btnCancel"),
                    press: function () { that._settingsDialog.close(); }
                }),
                afterClose: function () {
                    that._settingsDialog.destroy();
                    that._settingsDialog = null;
                    that._settingsCheckBoxes = null;
                }
            });

            this.getView().addDependent(this._settingsDialog);
            this._settingsDialog.open();
        },

        /**
         * Apply column visibility settings
         */
        _onApplyColumnSettings() {
            var oTable = this.byId("tblPartners");
            var aColumnSettings = this.getView().getModel("columnSettings").getData();
            var aColumns = oTable.getColumns();

            this._settingsCheckBoxes.forEach(function (oCb, iIndex) {
                var bVisible = oCb.getSelected();
                aColumnSettings[iIndex].visible = bVisible;
                if (aColumns[iIndex]) {
                    aColumns[iIndex].setVisible(bVisible);
                }
            });

            this.getView().getModel("columnSettings").setData(aColumnSettings);
            this._settingsDialog.close();
        },

        /**
         * Upload template handler – opens file dialog
         */
        onUploadTemplate() {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var oFileInput = document.createElement("input");
            oFileInput.type = "file";
            oFileInput.accept = ".csv,.xlsx,.xls";
            oFileInput.onchange = function (e) {
                var oFile = e.target.files[0];
                if (oFile) {
                    MessageToast.show(oBundle.getText("msgFileSelected", [oFile.name]));
                }
            };
            oFileInput.click();
        },

        /**
         * Download template based on enabled field customizations
         */
        onDownloadTemplate() {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var aActive = this._getActiveFieldCustomizations();

            var aColumns = aActive.map(function (oField) {
                return oField.customLabel && oField.customLabel.trim() !== "" ? oField.customLabel : oField.defaultLabel;
            });

            var sContent = aColumns.join(",") + "\n";
            var oBlob = new Blob([sContent], { type: "text/csv;charset=utf-8;" });
            var sUrl = URL.createObjectURL(oBlob);
            var oLink = document.createElement("a");
            oLink.href = sUrl;
            oLink.download = "Partner_Onboarding_Template.csv";
            oLink.click();
            URL.revokeObjectURL(sUrl);

            MessageToast.show(oBundle.getText("msgTemplateDownloaded"));
        },

        /**
         * Fetch periods from TCMP destination and populate the Partner Analytics period MultiComboBox
         */
        _loadPeriods() {
            var sBaseUrl = this.getOwnerComponent().getManifestObject().resolveUri(
                this.getOwnerComponent().getManifestEntry("sap.app").dataSources.tcmp.uri
            );
            var sUrl = sBaseUrl + "/CS_V_PERIODS/CS_V_PERIODS?$filter=((PERIODTYPESEQ eq 2814749767106569 or PERIODTYPESEQ eq 2814749767106563 or PERIODTYPESEQ eq 2814749767106561) and REMOVEDATE eq 2200-01-01T00:00:00.0000000Z)";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch periods");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = (oData.value || []).filter(function (obj) {
                        return obj.CREATEDBY === "Administrator";
                    });

                    var aProcessed = aRecords.map(function (item) {
                        var sStart = item.STARTDATE ? item.STARTDATE.split("T")[0] : "";
                        var sEnd = "";
                        if (item.ENDDATE) {
                            var oEnd = new Date(item.ENDDATE.split("T")[0]);
                            oEnd.setDate(oEnd.getDate() - 1);
                            sEnd = oEnd.toISOString().split("T")[0];
                        }
                        item.PERIOD_RANGE = sStart + " to " + sEnd;
                        return item;
                    });

                    var oModel = that.getView().getModel("periodsData");
                    oModel.setSizeLimit(aProcessed.length);
                    oModel.setData(aProcessed);
                })
                .catch(function (oError) {
                    MessageBox.error("Error fetching periods: " + oError.message);
                });
        },

        /**
         * Fetch products from TCMP destination and populate the Product ID MultiComboBox
         */
        _loadProducts() {
            var sBaseUrl = this.getOwnerComponent().getManifestObject().resolveUri(
                this.getOwnerComponent().getManifestEntry("sap.app").dataSources.tcmp.uri
            );
            var sUrl = sBaseUrl + "/V_CS_SALESTRANSACTION/V_CS_SALESTRANSACTION";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch products");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aUnique = [];
                    var oSeen = {};
                    aRecords.forEach(function (oRecord) {
                        var sKey = oRecord.PRODUCTID;
                        if (sKey && !oSeen[sKey]) {
                            oSeen[sKey] = true;
                            aUnique.push({
                                PRODUCTID: sKey,
                                PRODUCTNAME: oRecord.PRODUCTNAME || sKey
                            });
                        }
                    });
                    aUnique.sort(function (a, b) { return a.PRODUCTID.localeCompare(b.PRODUCTID); });

                    var oModel = that.getView().getModel("productsData");
                    oModel.setSizeLimit(aUnique.length);
                    oModel.setData(aUnique);
                })
                .catch(function (oError) {
                    MessageBox.error("Error fetching products: " + oError.message);
                });
        },

        /**
         * Fetch credit types from TCMP destination and populate the Credit Type MultiComboBox
         */
        _loadCreditTypes() {
            var sBaseUrl = this.getOwnerComponent().getManifestObject().resolveUri(
                this.getOwnerComponent().getManifestEntry("sap.app").dataSources.tcmp.uri
            );
            var sUrl = sBaseUrl + "/CS_V_CREDITTYPES/CS_V_CREDITTYPES";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch credit types");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aUnique = [];
                    var oSeen = {};
                    aRecords.forEach(function (oRecord) {
                        var sKey = oRecord.CREDITTYPEID;
                        if (sKey && !oSeen[sKey]) {
                            oSeen[sKey] = true;
                            aUnique.push({ CREDITTYPEID: sKey });
                        }
                    });
                    aUnique.sort(function (a, b) { return a.CREDITTYPEID.localeCompare(b.CREDITTYPEID); });

                    var oModel = that.getView().getModel("creditTypesData");
                    oModel.setSizeLimit(aUnique.length);
                    oModel.setData(aUnique);
                })
                .catch(function (oError) {
                    MessageBox.error("Error fetching credit types: " + oError.message);
                });
        },

        /**
         * Fetch plan names from TCMP destination and populate the Plan Name combo box
         */
        _loadPlanNames() {
            var sBaseUrl = this.getOwnerComponent().getManifestObject().resolveUri(
                this.getOwnerComponent().getManifestEntry("sap.app").dataSources.tcmp.uri
            );
            var sUrl = sBaseUrl + "/V_CS_PLAN/V_CS_PLAN";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch plan names");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aUniqueNames = [];
                    var oSeen = {};
                    aRecords.forEach(function (oRecord) {
                        if (oRecord.NAME && !oSeen[oRecord.NAME]) {
                            oSeen[oRecord.NAME] = true;
                            aUniqueNames.push(oRecord.NAME);
                        }
                    });
                    aUniqueNames.sort();

                    var aItems = aUniqueNames.map(function (sName) {
                        return { key: sName, text: sName };
                    });
                    that.getView().getModel("planNames").setData(aItems);
                })
                .catch(function () {
                    MessageToast.show("Unable to load plan names.");
                });
        },

        /**
         * Load Chart.js library from CDN
         */
        _loadChartJS() {
            if (!window.Chart) {
                var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";
                script.async = true;
                script.onload = function () { console.log("Chart.js loaded successfully"); };
                script.onerror = function () { console.error("Failed to load Chart.js library"); };
                document.head.appendChild(script);
            }
        },

        /**
         * Handle Go button press on Partner Analytics filters — build $filter and fetch data
         */
        onAnalyticsGo() {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            // Collect filter values
            var aPeriodKeys = this.byId("cmbAnalyticsPeriods").getSelectedKeys();
            var aProductKeys = this.byId("cmbAnalyticsProducts").getSelectedKeys();
            var aCreditTypeKeys = this.byId("cmbAnalyticsCreditTypes").getSelectedKeys();
            var oDrs = this.byId("drsAnalyticsCompDate");
            var oDateFrom = oDrs.getDateValue();
            var oDateTo = oDrs.getSecondDateValue();

            // At least one filter mandatory
            if (aPeriodKeys.length === 0 && aProductKeys.length === 0 && aCreditTypeKeys.length === 0 && !oDateFrom) {
                MessageBox.warning(oBundle.getText("msgAtLeastOneFilter"));
                return;
            }

            // Build OData $filter parts
            var aFilters = [];

            if (aPeriodKeys.length > 0) {
                var sPeriodFilter = aPeriodKeys.map(function (k) { return "PERIODSEQ eq " + k; }).join(" or ");
                aFilters.push("(" + sPeriodFilter + ")");
            }
            if (aProductKeys.length > 0) {
                var sProductFilter = aProductKeys.map(function (k) { return "PRODUCTID eq '" + k + "'"; }).join(" or ");
                aFilters.push("(" + sProductFilter + ")");
            }
            if (aCreditTypeKeys.length > 0) {
                var sCreditFilter = aCreditTypeKeys.map(function (k) { return "CREDITTYPEID eq '" + k + "'"; }).join(" or ");
                aFilters.push("(" + sCreditFilter + ")");
            }
            if (oDateFrom && oDateTo) {
                var sFrom = oDateFrom.toISOString().split("T")[0] + "T00:00:00.0000000Z";
                var sTo = oDateTo.toISOString().split("T")[0] + "T00:00:00.0000000Z";
                aFilters.push("(COMPENSATIONDATE ge " + sFrom + " and COMPENSATIONDATE le " + sTo + ")");
            } else if (oDateFrom) {
                var sDateOnly = oDateFrom.toISOString().split("T")[0] + "T00:00:00.0000000Z";
                aFilters.push("(COMPENSATIONDATE eq " + sDateOnly + ")");
            }

            var sFilter = aFilters.join(" and ");

            var sBaseUrl = this.getOwnerComponent().getManifestObject().resolveUri(
                this.getOwnerComponent().getManifestEntry("sap.app").dataSources.tcmp.uri
            );
            var sUrl = sBaseUrl + "/SYZ_CA_PARTNER_ANALYTICS/SYZ_CA_PARTNER_ANALYTICS";
            if (sFilter) {
                sUrl += "?$filter=" + encodeURIComponent(sFilter);
            }

            var that = this;
            sap.ui.core.BusyIndicator.show(0);

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) { throw new Error("Failed to fetch analytics data"); }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    that.getView().getModel("analyticsRawData").setData(aRecords);

                    if (aRecords.length === 0) {
                        that.getView().getModel("analyticsChartData").setData([]);
                        MessageToast.show(oBundle.getText("msgNoAnalyticsData"));
                    } else {
                        that._updateAnalyticsChart();
                        MessageToast.show(oBundle.getText("msgAnalyticsDataLoaded", [aRecords.length]));
                    }
                    sap.ui.core.BusyIndicator.hide();
                })
                .catch(function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error("Error fetching analytics: " + oError.message);
                });
        },

        // ========== Chart Configuration Handlers ==========

        onChartTypeChange(oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            this.getView().getModel("chartConfig").setProperty("/chartType", sKey);
            this._updateAnalyticsChart();
        },

        onChartDimensionChange(oEvent) {
            var sKey = oEvent.getParameter("selectedItem").getKey();
            this.getView().getModel("chartConfig").setProperty("/dimension", sKey);
            this._updateAnalyticsChart();
        },

        onChartMeasureChange(oEvent) {
            var sKey = oEvent.getParameter("selectedItem").getKey();
            this.getView().getModel("chartConfig").setProperty("/measure", sKey);
            this._updateAnalyticsChart();
        },

        onChartTopNChange(oEvent) {
            var sKey = oEvent.getParameter("selectedItem").getKey();
            this.getView().getModel("chartConfig").setProperty("/topN", sKey);
            this._updateAnalyticsChart();
        },

        // ========== Chart Data Aggregation ==========

        /**
         * Aggregate raw analytics data and render the chart
         */
        _updateAnalyticsChart() {
            var aRawData = this.getView().getModel("analyticsRawData").getData();
            if (!aRawData || aRawData.length === 0) { return; }

            var oConfig = this.getView().getModel("chartConfig").getData();
            var sDimension = oConfig.dimension;
            var sMeasure = oConfig.measure;
            var sTopN = oConfig.topN;
            var sChartType = oConfig.chartType;

            // Group data by dimension
            var oGrouped = {};
            aRawData.forEach(function (item) {
                var sDimValue;
                switch (sDimension) {
                    case "PRODUCTID":
                        sDimValue = (item.PRODUCTID || "Unknown") + " - " + (item.PRODUCTNAME || "");
                        break;
                    case "CREDITTYPEID":
                        sDimValue = item.CREDITTYPEID || "Unknown";
                        break;
                    case "COMPENSATIONDATE":
                        sDimValue = item.COMPENSATIONDATE ? item.COMPENSATIONDATE.split("T")[0] : "Unknown";
                        break;
                    default:
                        sDimValue = item[sDimension] || "Unknown";
                }

                if (!oGrouped[sDimValue]) {
                    oGrouped[sDimValue] = { dimension: sDimValue, totalAmount: 0, recordCount: 0 };
                }
                oGrouped[sDimValue].totalAmount += (parseFloat(item.VALUE) || 0);
                oGrouped[sDimValue].recordCount++;
            });

            // Build chart data array
            var aChartData = Object.values(oGrouped).map(function (g) {
                return {
                    dimension: g.dimension,
                    value: sMeasure === "Amount" ? g.totalAmount : g.recordCount
                };
            });

            // Sort descending by value
            aChartData.sort(function (a, b) { return b.value - a.value; });

            // Apply Top N
            if (sTopN !== "all") {
                aChartData = aChartData.slice(0, parseInt(sTopN, 10));
            }

            this.getView().getModel("analyticsChartData").setData(aChartData);

            var that = this;
            setTimeout(function () {
                that._renderAnalyticsChart(aChartData, sChartType, sDimension, sMeasure);
            }, 150);
        },

        // ========== Chart Rendering ==========

        /**
         * Render the analytics chart using Chart.js
         */
        _renderAnalyticsChart(aChartData, sChartType, sDimension, sMeasure) {
            if (!window.Chart) {
                MessageToast.show("Chart library is still loading. Please try again.");
                return;
            }

            var oCanvas = document.getElementById("partnerAnalyticsChart");
            if (!oCanvas) {
                var that = this;
                setTimeout(function () { that._renderAnalyticsChart(aChartData, sChartType, sDimension, sMeasure); }, 200);
                return;
            }

            this._destroyAnalyticsChart();

            var aLabels = aChartData.map(function (item) { return item.dimension; });
            var aValues = aChartData.map(function (item) { return item.value; });

            // Map to Chart.js types
            var sChartJsType = sChartType;
            if (sChartType === "column") { sChartJsType = "bar"; }
            else if (sChartType === "donut") { sChartJsType = "doughnut"; }
            else if (sChartType === "area") { sChartJsType = "line"; }

            var aColors = this._generateChartColors(aChartData.length);

            var sDimensionLabel = sDimension === "PRODUCTID" ? "Product" : sDimension === "CREDITTYPEID" ? "Credit Type" : "Compensation Date";
            var sMeasureLabel = sMeasure === "Amount" ? "Amount ($)" : "No. of Transactions";

            var oConfig = {
                type: sChartJsType,
                data: {
                    labels: aLabels,
                    datasets: [{
                        label: sMeasureLabel,
                        data: aValues,
                        backgroundColor: sChartType === "area"
                            ? "rgba(54, 162, 235, 0.4)"
                            : (sChartJsType === "pie" || sChartJsType === "doughnut" ? aColors : aColors[0]),
                        borderColor: sChartType === "area"
                            ? "rgba(54, 162, 235, 1)"
                            : (sChartJsType === "pie" || sChartJsType === "doughnut" ? aColors : aColors[0]),
                        borderWidth: sChartType === "area" ? 2 : 1,
                        fill: sChartType === "area",
                        tension: sChartType === "area" ? 0.4 : 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: sChartType === "bar" ? "y" : "x",
                    plugins: {
                        legend: {
                            display: sChartJsType === "pie" || sChartJsType === "doughnut",
                            position: "right"
                        },
                        title: {
                            display: true,
                            text: sMeasureLabel + " by " + sDimensionLabel
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    var sLabel = context.dataset.label || "";
                                    if (sLabel) { sLabel += ": "; }
                                    var nVal = sChartType === "bar" ? context.parsed.x : context.parsed.y;
                                    if (sChartJsType === "pie" || sChartJsType === "doughnut") {
                                        nVal = context.parsed;
                                    }
                                    if (sMeasure === "Amount") {
                                        sLabel += "$" + nVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                    } else {
                                        sLabel += nVal;
                                    }
                                    return sLabel;
                                }
                            }
                        }
                    },
                    scales: (sChartJsType === "pie" || sChartJsType === "doughnut") ? {} :
                        sChartType === "bar" ? {
                            x: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return sMeasure === "Amount" ? "$" + value.toLocaleString() : value;
                                    }
                                }
                            },
                            y: { beginAtZero: true }
                        } : {
                            x: { beginAtZero: true },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return sMeasure === "Amount" ? "$" + value.toLocaleString() : value;
                                    }
                                }
                            }
                        }
                }
            };

            this._analyticsChartInstance = new window.Chart(oCanvas, oConfig);
        },

        /**
         * Destroy existing analytics chart instance
         */
        _destroyAnalyticsChart() {
            if (this._analyticsChartInstance) {
                this._analyticsChartInstance.destroy();
                this._analyticsChartInstance = null;
            }
        },

        /**
         * Generate an array of colors for chart datasets
         */
        _generateChartColors(iCount) {
            var aBaseColors = [
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 99, 132, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(255, 159, 64, 0.8)",
                "rgba(199, 199, 199, 0.8)",
                "rgba(83, 102, 255, 0.8)",
                "rgba(255, 99, 255, 0.8)",
                "rgba(50, 205, 50, 0.8)"
            ];
            if (iCount <= aBaseColors.length) { return aBaseColors.slice(0, iCount); }
            var aColors = aBaseColors.slice();
            for (var i = aBaseColors.length; i < iCount; i++) {
                var hue = (i * 137.508) % 360;
                aColors.push("hsla(" + hue + ", 70%, 60%, 0.8)");
            }
            return aColors;
        },

        /**
         * Clear Incentive Program Setup form
         */
        onClearIncentiveForm() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgIncentiveFormCleared"));
        },

        /**
         * Submit Incentive Program
         */
        onSubmitIncentive() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgIncentiveSubmitted"));
        },

        // ========== Incentive Program Table ==========

        /**
         * Update the Programs table title with current count
         */
        _updateIncentiveProgramCount() {
            var iCount = this.getView().getModel("incentivePrograms").getData().length;
            this.byId("incentiveTableTitle").setText("Programs (" + iCount + ")");
        },

        /**
         * Add a new row to the incentive programs table
         */
        onAddIncentiveRow() {
            var oModel = this.getView().getModel("incentivePrograms");
            var aData = oModel.getData();
            aData.push({
                planName: "",
                incentiveTypes: [],
                eligibleTier: "",
                startDate: "",
                endDate: "",
                dealStage: "",
                fileName: ""
            });
            oModel.setData(aData);
            this._updateIncentiveProgramCount();
        },

        /**
         * Delete a row from the incentive programs table
         */
        onDeleteIncentiveRow(oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("incentivePrograms");
            var sPath = oContext.getPath();
            var iIndex = parseInt(sPath.substring(1), 10);

            var oModel = this.getView().getModel("incentivePrograms");
            var aData = oModel.getData();
            aData.splice(iIndex, 1);
            oModel.setData(aData);
            this._updateIncentiveProgramCount();
        },

        /**
         * Save incentive programs (placeholder)
         */
        onSaveIncentivePrograms() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgIncentiveProgramsSaved"));
        },

        /**
         * Handle incentive document file change
         */
        onIncentiveFileChange(oEvent) {
            var sFileName = oEvent.getParameter("newValue");
            if (sFileName) {
                MessageToast.show(
                    this.getView().getModel("i18n").getResourceBundle().getText("msgIncentiveFileSelected", [sFileName])
                );
            }
        },

        // ========== Configurations - Data Sources ==========

        /**
         * Get base URL for the main OData service
         */
        _getServiceBaseUrl() {
            return this.getOwnerComponent().getManifestObject().resolveUri(
                this.getOwnerComponent().getManifestEntry("sap.app").dataSources.mainService.uri
            );
        },

        /**
         * Handle data source list selection in the SplitContainer
         */
        onConfigDataSourceSelect(oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var sKey = oItem.data("key") || "incentiveTypes";
            var oSplitContainer = this.byId("configSplitContainer");

            if (sKey === "incentiveTypes") {
                this._loadIncentiveTypesConfig();
                oSplitContainer.toDetail(this.byId("configIncentiveTypesPage"));
            } else if (sKey === "eligibleTiers") {
                this._loadEligibleTiersConfig();
                oSplitContainer.toDetail(this.byId("configEligibleTiersPage"));
            } else if (sKey === "partnerTypes") {
                this._loadPartnerTypesConfig();
                oSplitContainer.toDetail(this.byId("configPartnerTypesPage"));
            }
        },

        /**
         * Load incentive types from backend into the config table
         */
        _loadIncentiveTypesConfig() {
            var sUrl = this._getServiceBaseUrl() + "IncentiveTypes";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch incentive types");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aItems = aRecords.map(function (oRecord) {
                        return {
                            incentiveType: oRecord.incentiveType,
                            active: oRecord.active
                        };
                    });
                    that.getView().getModel("incentiveTypes").setData(aItems);
                    that._updateIncentiveTypesCount();
                })
                .catch(function () {
                    that.getView().getModel("incentiveTypes").setData([]);
                    that._updateIncentiveTypesCount();
                });
        },

        /**
         * Add a new row to the incentive types table
         */
        onAddIncentiveTypeRow() {
            var oModel = this.getView().getModel("incentiveTypes");
            var aData = oModel.getData();
            aData.push({
                incentiveType: "",
                active: true
            });
            oModel.setData(aData);
            this._updateIncentiveTypesCount();
        },

        /**
         * Delete a row from the incentive types table
         */
        onDeleteIncentiveTypeRow(oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("incentiveTypes");
            var sPath = oContext.getPath();
            var iIndex = parseInt(sPath.substring(1), 10);

            var oModel = this.getView().getModel("incentiveTypes");
            var aData = oModel.getData();
            aData.splice(iIndex, 1);
            oModel.setData(aData);
            this._updateIncentiveTypesCount();
        },

        /**
         * Save incentive types to backend
         */
        onSaveIncentiveTypes() {
            var oModel = this.getView().getModel("incentiveTypes");
            var aData = oModel.getData();
            var that = this;

            var aItems = aData.filter(function (oItem) {
                return oItem.incentiveType && oItem.incentiveType.trim() !== "";
            }).map(function (oItem) {
                return {
                    incentiveType: oItem.incentiveType.trim(),
                    active: oItem.active
                };
            });

            var sUrl = this._getServiceBaseUrl() + "saveIncentiveTypes";

            fetch(sUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: aItems })
            })
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to save incentive types");
                    }
                    return oResponse.json();
                })
                .then(function () {
                    MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("msgIncentiveTypesSaved"));
                    that._loadIncentiveTypesConfig();
                    that._loadIncentiveTypes();
                })
                .catch(function () {
                    MessageToast.show("Failed to save incentive types.");
                });
        },

        /**
         * Load active incentive types from backend and populate the MultiComboBox
         */
        _loadIncentiveTypes() {
            var sUrl = this._getServiceBaseUrl() + "IncentiveTypes?$filter=active eq true";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch incentive types");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aItems = aRecords.map(function (oRecord) {
                        return { key: oRecord.incentiveType, text: oRecord.incentiveType };
                    });
                    that.getView().getModel("activeIncentiveTypes").setData(aItems);
                })
                .catch(function () {
                    // silently ignore if no incentive types configured yet
                });
        },

        // ========== Configurations - Eligible Tiers ==========

        /**
         * Load eligible tiers from backend into the config table
         */
        _loadEligibleTiersConfig() {
            var sUrl = this._getServiceBaseUrl() + "EligibleTiers";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch eligible tiers");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aItems = aRecords.map(function (oRecord) {
                        return {
                            partnerTier: oRecord.partnerTier,
                            revenueBand: oRecord.revenueBand,
                            region: oRecord.region,
                            tier: oRecord.tier,
                            eligibilityFlag: oRecord.eligibilityFlag
                        };
                    });
                    that.getView().getModel("eligibleTiers").setData(aItems);
                    that._updateEligibleTiersCount();
                })
                .catch(function () {
                    that.getView().getModel("eligibleTiers").setData([]);
                    that._updateEligibleTiersCount();
                });
        },

        /**
         * Load eligible tiers for the ComboBox dropdown in incentive programs table
         */
        _loadEligibleTiers() {
            var sUrl = this._getServiceBaseUrl() + "EligibleTiers";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch eligible tiers");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aItems = aRecords.map(function (oRecord) {
                        return { partnerTier: oRecord.partnerTier, revenueBand: oRecord.revenueBand };
                    });
                    that.getView().getModel("eligibleTiersConfig").setData(aItems);
                })
                .catch(function () {
                    // silently ignore if no eligible tiers configured yet
                });
        },

        /**
         * Add a new row to the eligible tiers config table
         */
        onAddEligibleTierRow() {
            var oModel = this.getView().getModel("eligibleTiers");
            var aData = oModel.getData();
            aData.push({
                partnerTier: "",
                revenueBand: "",
                region: "",
                tier: "",
                eligibilityFlag: ""
            });
            oModel.setData(aData);
            this._updateEligibleTiersCount();
        },

        /**
         * Delete a row from the eligible tiers config table
         */
        onDeleteEligibleTierRow(oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("eligibleTiers");
            var sPath = oContext.getPath();
            var iIndex = parseInt(sPath.substring(1), 10);

            var oModel = this.getView().getModel("eligibleTiers");
            var aData = oModel.getData();
            aData.splice(iIndex, 1);
            oModel.setData(aData);
            this._updateEligibleTiersCount();
        },

        /**
         * Save eligible tiers to backend
         */
        onSaveEligibleTiers() {
            var oModel = this.getView().getModel("eligibleTiers");
            var aData = oModel.getData();
            var that = this;

            var aItems = aData.filter(function (oItem) {
                return oItem.partnerTier && oItem.partnerTier.trim() !== "";
            }).map(function (oItem) {
                return {
                    partnerTier: oItem.partnerTier.trim(),
                    revenueBand: (oItem.revenueBand || "").trim(),
                    region: (oItem.region || "").trim(),
                    tier: (oItem.tier || "").trim(),
                    eligibilityFlag: (oItem.eligibilityFlag || "").trim()
                };
            });

            var sUrl = this._getServiceBaseUrl() + "saveEligibleTiers";

            fetch(sUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: aItems })
            })
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to save eligible tiers");
                    }
                    return oResponse.json();
                })
                .then(function () {
                    MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("msgEligibleTiersSaved"));
                    that._loadEligibleTiersConfig();
                    that._loadEligibleTiers();
                })
                .catch(function () {
                    MessageToast.show("Failed to save eligible tiers.");
                });
        },

        // ========== Partner Assignment ==========

        /**
         * Update the Assignments table title with current count
         */
        _updateAssignmentCount() {
            var iCount = this.getView().getModel("partnerAssignments").getData().length;
            this.byId("partnerAssignmentTableTitle").setText("Assignments (" + iCount + ")");
        },

        /**
         * Add a new row to the partner assignments table
         */
        onAddAssignmentRow() {
            var oModel = this.getView().getModel("partnerAssignments");
            var aData = oModel.getData();
            aData.push({
                partnerName: "",
                incentivePlan: ""
            });
            oModel.setData(aData);
            this._updateAssignmentCount();
        },

        /**
         * Delete a row from the partner assignments table
         */
        onDeleteAssignmentRow(oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("partnerAssignments");
            var sPath = oContext.getPath();
            var iIndex = parseInt(sPath.substring(1), 10);

            var oModel = this.getView().getModel("partnerAssignments");
            var aData = oModel.getData();
            aData.splice(iIndex, 1);
            oModel.setData(aData);
            this._updateAssignmentCount();
        },

        /**
         * Save partner assignments (placeholder)
         */
        onSaveAssignments() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgAssignmentsSaved"));
        },

        // ========== Field Customizations ==========

        /**
         * Load field customizations from backend; if empty, use defaults
         */
        _loadFieldCustomizations() {
            var sUrl = this._getServiceBaseUrl() + "FieldCustomizations";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch field customizations");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aItems;
                    if (aRecords.length > 0) {
                        aItems = aRecords.map(function (oRecord) {
                            return {
                                position: oRecord.position,
                                fieldId: oRecord.fieldId,
                                columnName: oRecord.columnName,
                                defaultLabel: oRecord.defaultLabel,
                                customLabel: oRecord.customLabel,
                                enabled: oRecord.enabled,
                                fixed: oRecord.fixed
                            };
                        }).sort(function (a, b) { return a.position - b.position; });
                    } else {
                        aItems = that._defaultFieldCustomizations.map(function (oItem) {
                            return Object.assign({}, oItem);
                        });
                    }
                    that.getView().getModel("fieldCustomizations").setData(aItems);
                    that._buildPartnerTable();
                    that._updateFieldCustomizationsCount();
                })
                .catch(function () {
                    var aItems = that._defaultFieldCustomizations.map(function (oItem) {
                        return Object.assign({}, oItem);
                    });
                    that.getView().getModel("fieldCustomizations").setData(aItems);
                    that._buildPartnerTable();
                    that._updateFieldCustomizationsCount();
                });
        },

        /**
         * Save field customizations to backend
         */
        onSaveFieldCustomizations() {
            var oModel = this.getView().getModel("fieldCustomizations");
            var aData = oModel.getData();
            var that = this;

            var aItems = aData.map(function (oItem) {
                return {
                    position: oItem.position,
                    fieldId: oItem.fieldId,
                    columnName: oItem.columnName,
                    defaultLabel: oItem.defaultLabel,
                    customLabel: (oItem.customLabel || "").trim(),
                    enabled: oItem.enabled,
                    fixed: oItem.fixed
                };
            });

            var sUrl = this._getServiceBaseUrl() + "saveFieldCustomizations";

            fetch(sUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: aItems })
            })
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to save field customizations");
                    }
                    return oResponse.json();
                })
                .then(function () {
                    MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("msgFieldCustomizationsSaved"));
                    that._loadFieldCustomizations();
                })
                .catch(function () {
                    MessageToast.show("Failed to save field customizations.");
                });
        },

        // ========== Customization Module Selection ==========

        /**
         * Handle customization module list selection in the SplitContainer
         */
        onCustomizationModuleSelect(oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var sKey = oItem.data("key") || "partnerOnboarding";
            var oSplitContainer = this.byId("customizationsSplitContainer");

            if (sKey === "partnerOnboarding") {
                this._loadFieldCustomizations();
                oSplitContainer.toDetail(this.byId("customizationsPartnerOnboardingPage"));
            }
        },

        // ========== Record Count Updates ==========

        /**
         * Update the incentive types page title with current count
         */
        _updateIncentiveTypesCount() {
            var oTitle = this.byId("incentiveTypesPageTitle");
            if (oTitle) {
                var iCount = this.getView().getModel("incentiveTypes").getData().length;
                oTitle.setText(this.getView().getModel("i18n").getResourceBundle().getText("lblIncentiveTypes") + " (" + iCount + ")");
            }
        },

        /**
         * Update the eligible tiers page title with current count
         */
        _updateEligibleTiersCount() {
            var oTitle = this.byId("eligibleTiersPageTitle");
            if (oTitle) {
                var iCount = this.getView().getModel("eligibleTiers").getData().length;
                oTitle.setText(this.getView().getModel("i18n").getResourceBundle().getText("lblEligibleTiers") + " (" + iCount + ")");
            }
        },

        /**
         * Update the partner types page title with current count
         */
        _updatePartnerTypesCount() {
            var oTitle = this.byId("partnerTypesPageTitle");
            if (oTitle) {
                var iCount = this.getView().getModel("partnerTypes").getData().length;
                oTitle.setText(this.getView().getModel("i18n").getResourceBundle().getText("lblPartnerTypes") + " (" + iCount + ")");
            }
        },

        /**
         * Update the field customizations page title with current count
         */
        _updateFieldCustomizationsCount() {
            var oTitle = this.byId("fieldCustomizationsTableTitle");
            if (oTitle) {
                var iCount = this.getView().getModel("fieldCustomizations").getData().length;
                oTitle.setText(this.getView().getModel("i18n").getResourceBundle().getText("navPartnerOnboarding") + " (" + iCount + ")");
            }
        },

        // ========== Configurations - Partner Types ==========

        /**
         * Load partner types from backend into the config table
         */
        _loadPartnerTypesConfig() {
            var sUrl = this._getServiceBaseUrl() + "PartnerTypes";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch partner types");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aItems = aRecords.map(function (oRecord) {
                        return {
                            partnerType: oRecord.partnerType,
                            active: oRecord.active
                        };
                    });
                    that.getView().getModel("partnerTypes").setData(aItems);
                    that._updatePartnerTypesCount();
                })
                .catch(function () {
                    that.getView().getModel("partnerTypes").setData([]);
                    that._updatePartnerTypesCount();
                });
        },

        /**
         * Load active partner types from backend
         */
        _loadPartnerTypes() {
            var sUrl = this._getServiceBaseUrl() + "PartnerTypes?$filter=active eq true";
            var that = this;

            fetch(sUrl)
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to fetch partner types");
                    }
                    return oResponse.json();
                })
                .then(function (oData) {
                    var aRecords = oData.value || [];
                    var aItems = aRecords.map(function (oRecord) {
                        return { partnerType: oRecord.partnerType };
                    });
                    that.getView().getModel("activePartnerTypes").setData(aItems);
                })
                .catch(function () {
                    // silently ignore if no partner types configured yet
                });
        },

        /**
         * Add a new row to the partner types table
         */
        onAddPartnerTypeRow() {
            var oModel = this.getView().getModel("partnerTypes");
            var aData = oModel.getData();
            aData.push({
                partnerType: "",
                active: true
            });
            oModel.setData(aData);
            this._updatePartnerTypesCount();
        },

        /**
         * Delete a row from the partner types table
         */
        onDeletePartnerTypeRow(oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("partnerTypes");
            var sPath = oContext.getPath();
            var iIndex = parseInt(sPath.substring(1), 10);

            var oModel = this.getView().getModel("partnerTypes");
            var aData = oModel.getData();
            aData.splice(iIndex, 1);
            oModel.setData(aData);
            this._updatePartnerTypesCount();
        },

        /**
         * Save partner types to backend
         */
        onSavePartnerTypes() {
            var oModel = this.getView().getModel("partnerTypes");
            var aData = oModel.getData();
            var that = this;

            var aItems = aData.filter(function (oItem) {
                return oItem.partnerType && oItem.partnerType.trim() !== "";
            }).map(function (oItem) {
                return {
                    partnerType: oItem.partnerType.trim(),
                    active: oItem.active
                };
            });

            var sUrl = this._getServiceBaseUrl() + "savePartnerTypes";

            fetch(sUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: aItems })
            })
                .then(function (oResponse) {
                    if (!oResponse.ok) {
                        throw new Error("Failed to save partner types");
                    }
                    return oResponse.json();
                })
                .then(function () {
                    MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("msgPartnerTypesSaved"));
                    that._loadPartnerTypesConfig();
                    that._loadPartnerTypes();
                })
                .catch(function () {
                    MessageToast.show("Failed to save partner types.");
                });
        }
    });
});
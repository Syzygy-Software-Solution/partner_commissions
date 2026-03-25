sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Item",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, Item, JSONModel) => {
    "use strict";

    return Controller.extend("partnercommissions.controller.Main", {

        /**
         * Map of side nav keys to page IDs in NavContainer
         */
        _navKeyToPageId: {
            dashboard: "dashboardPage",
            partnerOnboarding: "partnerOnboardingPage",
            incentiveProgramSetup: "incentiveProgramSetupPage",
            riskScreening: "riskScreeningPage",
            paymentScheduleSetup: "paymentScheduleSetupPage",
            partnerHierarchySetup: "partnerHierarchySetupPage",
            partnerMappings: "partnerMappingsPage",
            dealRegistration: "dealRegistrationPage",
            paymentApproval: "paymentApprovalPage",
            configDataSources: "configDataSourcesPage",
            configCustomizations: "configCustomizationsPage",
            settings: "settingsPage"
        },

        onInit() {
            this._populateDayComboBox();

            this.getView().setModel(new JSONModel([]), "incentiveTypes");
            this.getView().setModel(new JSONModel([]), "incentivePrograms");
            this.getView().setModel(new JSONModel([]), "planNames");
            this.getView().setModel(new JSONModel([]), "activeIncentiveTypes");

            this._loadPlanNames();
            this._loadIncentiveTypes();

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
            }
        },

        /**
         * Populate the Day combo box with 1-31
         */
        _populateDayComboBox() {
            var oCbDay = this.byId("cbYearsInBusinessDay");
            if (oCbDay) {
                for (var i = 1; i <= 31; i++) {
                    var sDay = i.toString();
                    oCbDay.addItem(new Item({ key: sDay, text: sDay }));
                }
            }

            var oCbYear = this.byId("cbYearsInBusinessYear");
            if (oCbYear) {
                var iCurrentYear = new Date().getFullYear();
                for (var y = iCurrentYear; y >= iCurrentYear - 100; y--) {
                    var sYear = y.toString();
                    oCbYear.addItem(new Item({ key: sYear, text: sYear }));
                }
            }
        },

        /**
         * Clear all inputs in the Partner Registration form
         */
        onClearForm() {
            this.byId("cbPartnerType").setSelectedKey("");
            this.byId("inpPartnerName").setValue("");
            this.byId("inpCompanyRegNumber").setValue("");
            this.byId("inpTaxId").setValue("");
            this.byId("cbCountry").setSelectedKey("");
            this.byId("inpAddress").setValue("");
            this.byId("cbIndustry").setSelectedKey("");
            this.byId("cbYearsInBusinessMonth").setSelectedKey("");
            this.byId("cbYearsInBusinessDay").setSelectedKey("");
            this.byId("cbYearsInBusinessYear").setSelectedKey("");
            this.byId("inpAnnualRevenue").setValue("");
            this.byId("inpNumberOfEmployees").setValue("");

            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgFormCleared"));
        },

        /**
         * Save draft handler
         */
        onSaveDraft() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgDraftSaved"));
        },

        /**
         * Submit for Risk Screening handler
         */
        onSubmitRiskScreening() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgSubmittedRiskScreening"));
        },

        /**
         * Download Excel template for bulk onboarding
         */
        onDownloadTemplate() {
            // Column definitions for the template
            var aColumns = [
                "Partner Type", "Partner Name", "Company Registration Number",
                "Tax ID", "Country", "Address", "Industry",
                "Business Start Date", "Annual Revenue", "Number of Employees"
            ];

            // Create CSV content as a simple template
            var sContent = aColumns.join(",") + "\n";
            var oBlob = new Blob([sContent], { type: "text/csv;charset=utf-8;" });
            var sUrl = URL.createObjectURL(oBlob);
            var oLink = document.createElement("a");
            oLink.href = sUrl;
            oLink.download = "Partner_Onboarding_Template.csv";
            oLink.click();
            URL.revokeObjectURL(sUrl);

            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgTemplateDownloaded"));
        },

        /**
         * Handle Excel file upload change
         */
        onExcelFileChange(oEvent) {
            var sFileName = oEvent.getParameter("newValue");
            if (sFileName) {
                MessageToast.show(
                    this.getView().getModel("i18n").getResourceBundle().getText("msgFileSelected", [sFileName])
                );
            }
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
                    var aItems = aRecords.map(function (oRecord, iIndex) {
                        return {
                            sno: iIndex + 1,
                            incentiveType: oRecord.incentiveType,
                            active: oRecord.active
                        };
                    });
                    that.getView().getModel("incentiveTypes").setData(aItems);
                })
                .catch(function () {
                    that.getView().getModel("incentiveTypes").setData([]);
                });
        },

        /**
         * Add a new row to the incentive types table
         */
        onAddIncentiveTypeRow() {
            var oModel = this.getView().getModel("incentiveTypes");
            var aData = oModel.getData();
            aData.push({
                sno: aData.length + 1,
                incentiveType: "",
                active: true
            });
            oModel.setData(aData);
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

            // Renumber
            aData.forEach(function (oItem, i) {
                oItem.sno = i + 1;
            });
            oModel.setData(aData);
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
        }
    });
});
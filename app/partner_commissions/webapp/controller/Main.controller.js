sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Item"
], (Controller, MessageToast, Item) => {
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
            dealRegistration: "dealRegistrationPage",
            paymentApproval: "paymentApprovalPage",
            configurations: "configurationsPage",
            settings: "settingsPage"
        },

        onInit() {
            this._populateDayComboBox();

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
         * Clear Incentive Program Setup form
         */
        onClearIncentiveForm() {
            this.byId("inpProgramName").setValue("");
            this.byId("sbIncentiveType").setSelectedKey("spiff");
            this.byId("chkSilver").setSelected(false);
            this.byId("chkGold").setSelected(false);
            this.byId("dpStartDate").setValue("");
            this.byId("dpEndDate").setValue("");
            this.byId("cbDealStage").setSelectedKey("");
            this.byId("fileUploaderIncentive").clear();

            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgIncentiveFormCleared"));
        },

        /**
         * Submit Incentive Program
         */
        onSubmitIncentive() {
            MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("msgIncentiveSubmitted"));
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
        }
    });
});
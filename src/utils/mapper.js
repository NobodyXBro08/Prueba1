const mapFormDataToOTC = (formData) => {
  return {
    enterpriseInformation: {
      companyId: formData.companyId,
      companyName: formData.companyName,
      companyAcronym: formData.companyAcronym,
      companyType: formData.companyType,
      companyEmail: formData.companyEmail,
      companyAddress: formData.companyAddress,
      companyCountry: formData.companyCountry,
      companyState: formData.companyState,
      companyCity: formData.companyCity,
      companyPhone: formData.companyPhone,
      acceptFundDeclaration: formData.acceptFundDeclaration,
      acceptDataUse: formData.acceptDataUse,
      kiiexUserName: formData.kiiexUserName,
      kiiexEmail: formData.kiiexEmail,
    },
    legalRepresentative: {
      personalInformation: {
        agentId: formData.agentId_passport,
        agentName: formData.agentName,
        agentBornCountry: formData.agentBornCountry,
        agentBirthDate: formData.agentBirthDate,
        agentEmail: formData.agentEmail,
        agentAddress: formData.agentAddress,
        agentPhone: formData.agentPhone,
        agentCountry: formData.agentCountry,
        agentState: formData.agentState,
        agentCity: formData.agentCity,
      },
      exposeInformation: {
        agentIsExpose: formData.agentIsExpose,
        agentIsPublic: formData.agenIisPublic,
        agentEntityName: formData.agentEntityName,
        agentRelativeExpose: formData.agentRelativeExpose,
        agentRelativeName: formData.agentRelativeName,
        agentRelationshipExpose: formData.agentRelationshipExpose,
      },
    },
    shareholders: Array.isArray(formData.shareholders)
      ? formData.shareholders.map((shareholder) => ({
          personalInformation: {
            agentId: shareholder.shareholdersId_passport,
            agentName: shareholder.shareholdersName,
            agentBornCountry: shareholder.shareholdersBornCountry,
            agentBirthDate: shareholder.shareholdersBirthDate,
            agentEmail: shareholder.shareholdersEmail,
            agentAddress: shareholder.shareholdersAddress,
            agentPhone: shareholder.shareholdersPhone,
            agentCountry: shareholder.shareholdersCountry,
            agentState: shareholder.shareholdersState,
            agentCity: shareholder.shareholdersCity,
          },
          exposeInformation: {
            agentIsExpose: shareholder.shareholdersIsExpose,
            agenIisPublic: shareholder.shareholdersIsPublic,
            agentEntityName: shareholder.shareholdersEntityName,
            agentRelativeExpose: shareholder.shareholdersRelativeExpose,
            agentRelativeName: shareholder.shareholdersRelativeName,
            agentRelationshipExpose: shareholder.shareholdersRelationshipExpose,
          },
        }))
      : [], // Si no hay accionistas, asignamos un array vacío
    traders: Array.isArray(formData.traders)
      ? formData.traders.map((trader) => ({
          tradersId: trader.tradersId_passport,
          tradersName: trader.tradersName,
          tradersEmail: trader.tradersEmail,
          tradersPhone: trader.tradersPhone,
        }))
      : [], // Si no hay traders, asignamos un array vacío
    financialInformation: {
      financialAssets: formData.financialAssets,
      financialCoins: formData.financialCoins,
      financialOtherCoins: formData.financialOtherCoins,
      financialDaily: formData.financialDaily,
    },
    bankingInformation: Array.isArray(formData.bankAccounts)
      ? formData.bankAccounts.map((bank) => ({
          bankAccount: bank.bankAccount,
          bankName: bank.bankName,
          bankType: bank.bankType,
          bankCountry: bank.bankCountry,
          bankSwift: bank.bankSwift,
        }))
      : [], // Si no hay información bancaria, asignamos un array vacío
    walletInformation: Array.isArray(formData.wallets)
      ? formData.wallets.map((wallet) => ({
          walletAddress: wallet.walletAddress,
          walletCurrency: wallet.walletCurrency,
        }))
      : [], // Si no hay información de wallet, asignamos un array vacío
    internationalOperations: {
      internationalOperations: formData.internationalOperations,
      internationalBank: formData.internationalBank,
      internationalAccountType: formData.internationalAccountType,
      internationalAccountNumber: formData.internationalAccountNumber,
      internationalAccountCountry: formData.internationalAccountCountry,
      internationalAccountCity: formData.internationalAccountCity,
      internationalCurrency: formData.internationalCurrency,
      internationalOperationsType: formData.internationalOperationsType,
      internationalOtherOperations: formData.internationalOtherOperations,
      internationalOtherCurrency: formData.internationalOtherCurrency,
    },
    documents: {
      docRegister: "https://dummy.com/doc_register.pdf",
      docRut: "https://dummy.com/doc_rut.pdf",
      docReprentativeLegal: "https://dummy.com/doc_representative_legal.pdf",
      docResidenceRepresentative:
        "https://dummy.com/doc_residence_representative.pdf",
      docCompanyRepresentative:
        "https://dummy.com/doc_company_representative.pdf",
      docBankStatements: "https://dummy.com/doc_bank_statements.pdf",
      docShareholdingStructure:
        "https://dummy.com/doc_shareholding_structure.pdf",
      docShareholders: "https://dummy.com/doc_shareholders.pdf",
      docRubBio: "https://dummy.com/doc_rub_bio.pdf",
      docProfessionalLicense: "https://dummy.com/doc_professional_license.pdf",
      docCertifiedFinancialStatements:
        "https://dummy.com/doc_certified_financial_statements.pdf",
      docCompanyTaxReturn: "https://dummy.com/doc_company_tax_return.pdf",
      docLaft: "https://dummy.com/doc_laft.pdf",
      docLaftReports: "https://dummy.com/doc_laft_reports.pdf",
    },
  };
};

export { mapFormDataToOTC };

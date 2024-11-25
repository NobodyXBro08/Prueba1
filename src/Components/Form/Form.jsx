import { useState } from 'react';
import axios from 'axios';
import { mapFormDataToOTC } from '../../utils/mapper';
import './form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        companyId: '',
        companyName: '',
        companyAcronym: '',
        companyType: '',
        companyEmail: '',
        companyAddress: '',
        companyCountry: '',
        companyState: '',
        companyCity: '',
        companyPhone: '',
        acceptFundDeclaration: false,
        acceptDataUse: false,
        kiiexUserName: '',
        kiiexEmail: '',
        agentId_passport: '',
        agentName: '',
        agentBornCountry: '',
        agentBirthDate: '',
        agentEmail: '',
        agentAddress: '',
        agentPhone: '',
        agentCountry: '',
        agentState: '',
        agentCity: '',
        agentIsExpose: false,
        agentIsPublic: false,
        agentEntityName: '',
        agentRelativeExpose: false,
        agentRelativeName: '',
        agentRelationshipExpose: '',
        shareholders: [{
            id: 1,
            shareholdersId_passport: '',
            shareholdersName: '',
            shareholdersBornCountry: '',
            shareholdersBirthDate: '',
            shareholdersEmail: '',
            shareholdersAddress: '',
            shareholdersPhone: '',
            shareholdersCountry: '',
            shareholdersState: '',
            shareholdersCity: '',
            shareholdersIsExpose: false,
            shareholdersIsPublic: false,
            shareholdersEntityName: '',
            shareholdersRelativeExpose: false,
            shareholdersRelativeName: '',
            shareholdersRelationshipExpose: ''
        }],
        traders: [{
            id: 1,
            tradersId_passport: '',
            tradersName: '',
            tradersEmail: '',
            tradersPhone: ''
        }],
        financialAssets: [],
        financialCoins: "",
        financialOtherCoins: '',
        financialDaily: '',
        bankAccounts: [{
            id: 1,
            bankAccount: '',
            bankName: '',
            bankType: '',
            bankCountry: '',
            bankSwift: ''
        }],
        wallets: [{
            id: 1,
            walletAddress: '',
            walletCurrency: ''
        }],
        internationalOperations: false,
        internationalBank: '',
        internationalAccountType: '',
        internationalAccountNumber: '',
        internationalAccountCountry: '',
        internationalAccountCity: '',
        internationalCurrency: "",
        internationalOperationsType: "",
        internationalOtherOperations: '',
        internationalOtherCurrency: '',
        docRegister: '',
        docRut: '',
        docReprentativeLegal: '',
        docResidenceRepresentative: '',
        docCompanyRepresentative: '',
        docBankStatements: '',
        docShareholdingStructure: '',
        docShareholders: '',
        docRubBio: '',
        docProfessionalLicense: '',
        docCertifiedFinancial_statements: '',
        docCompanyTaxReturn: '',
        docLaft: '',
        docLaft_reports: ''
    });
// Maneja el cambio de país
const handleShareholderChange = (e, shareholderId ) => {
    const { name, value } = e.target;
    setFormData(prevState => {
        const updatedShareholders = prevState.shareholders.map(shareholder => {
            if (shareholder.id === shareholderId) {
                return { ...shareholder, [name]: value };
            }
            return shareholder;
        });

        return {
            ...prevState,
            shareholders: updatedShareholders,
        };
    });

    // Si el país cambia, actualizamos los estados disponibles
    if (name === 'shareholdersCountry') {
        const statesForCountry = states[value] || []; // `states` debe ser un objeto donde cada clave es un país
        setShareholdersStatesList({ ...shareholdersStatesList, [value]: statesForCountry });
    }
};

// Maneja el cambio de estado
const handleShareholderStateChange = (e, shareholderId) => {
    const { name, value } = e.target;
    setFormData(prevState => {
        const updatedShareholders = prevState.shareholders.map(shareholder => {
            if (shareholder.id === shareholderId) {
                return { ...shareholder, [name]: value };
            }
            return shareholder;
        });

        return {
            ...prevState,
            shareholders: updatedShareholders,
        };
    });

    // Si el estado cambia, actualizamos las ciudades disponibles
    if (name === 'shareholdersState') {
        const citiesForState = cities[value] || []; // `cities` debe ser un objeto donde cada clave es un estado
        setShareholdersCitiesList({ ...shareholdersCitiesList, [value]: citiesForState });
    }
};

// Maneja el cambio de ciudad
const handleShareholderCityChange = (e, shareholderId) => {
    const { name, value } = e.target;
    setFormData(prevState => {
        const updatedShareholders = prevState.shareholders.map(shareholder => {
            if (shareholder.id === shareholderId) {
                return { ...shareholder, [name]: value };
            }
            return shareholder;
        });

        return {
            ...prevState,
            shareholders: updatedShareholders,
        };
    });
};


    const addShareholder = () => {
        const newId = formData.shareholders.length + 1;
        setFormData((prevData) => ({
            ...prevData,
            shareholders: [
                ...prevData.shareholders,
                {
                    id: newId,
                    shareholdersId_passport: '',
                    shareholdersName: '',
                    shareholdersBornCountry: '',
                    shareholdersBirthDate: '',
                    shareholdersEmail: '',
                    shareholdersAddress: '',
                    shareholdersPhone: '',
                    shareholdersCountry: '',
                    shareholdersState: '',
                    shareholdersCity: '',
                    shareholdersIsExpose: false,
                    shareholdersIsPublic: false,
                    shareholdersEntityName: '',
                    shareholdersRelativeExpose: false,
                    shareholdersRelativeName: '',
                    shareholdersRelationshipExpose: ''
                }
            ],
        }));
    };

    // Función para eliminar un accionista
    const removeShareholder = (id) => {
        setFormData((prevData) => ({
            ...prevData,
            shareholders: prevData.shareholders.filter((shareholder) => shareholder.id !== id),
        }));
    };

    const handleTraderChange = (e, id) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            traders: prevData.traders.map((trader) =>
                trader.id === id ? { ...trader, [name]: value } : trader
            ),
        }));
    };

    // Función para agregar un nuevo trader
    const addTrader = () => {
        const newId = formData.traders.length + 1;
        setFormData((prevData) => ({
            ...prevData,
            traders: [
                ...prevData.traders,
                {
                    id: newId,
                    tradersId_passport: '',
                    tradersName: '',
                    tradersEmail: '',
                    tradersPhone: ''
                }
            ],
        }));
    };

    // Función para eliminar un trader
    const removeTrader = (id) => {
        setFormData((prevData) => ({
            ...prevData,
            traders: prevData.traders.filter((trader) => trader.id !== id),
        }));
    };

    const handleWalletChange = (e, id) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            wallets: prevData.wallets.map((wallet) =>
                wallet.id === id ? { ...wallet, [name]: value } : wallet
            ),
        }));
    };

    // Función para agregar un nuevo wallet
    const addWallet = () => {
        const newId = formData.wallets.length + 1;
        setFormData((prevData) => ({
            ...prevData,
            wallets: [
                ...prevData.wallets,
                {
                    id: newId,
                    walletAddress: '',
                    walletCurrency: ''
                }
            ],
        }));
    };

    // Función para eliminar un wallet
    const removeWallet = (id) => {
        setFormData((prevData) => ({
            ...prevData,
            wallets: prevData.wallets.filter((wallet) => wallet.id !== id),
        }));
    };

    const handleBankChange = (e, id) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            bankAccounts: prevData.bankAccounts.map((bank) =>
                bank.id === id ? { ...bank, [name]: value } : bank
            ),
        }));
    };

    // Función para agregar una nueva cuenta bancaria
    const addBankAccount = () => {
        const newId = formData.bankAccounts.length + 1;
        setFormData((prevData) => ({
            ...prevData,
            bankAccounts: [
                ...prevData.bankAccounts,
                {
                    id: newId,
                    bankAccount: '',
                    bankName: '',
                    bankType: '',
                    bankCountry: '',
                    bankSwift: ''
                }
            ],
        }));
    };

    // Función para eliminar una cuenta bancaria
    const removeBankAccount = (id) => {
        setFormData((prevData) => ({
            ...prevData,
            bankAccounts: prevData.bankAccounts.filter((bank) => bank.id !== id),
        }));
    };

    const countries = [
        'Argentina', 'Brasil', 'Canadá', 'Chile', 'Colombia', 'España', 'Estados Unidos', 'México'
    ];

    const states = {
        Argentina: ['Buenos Aires', 'CABA', 'Córdoba', 'Mendoza', 'Santa Fe'],
        Brasil: ['Bahía', 'Minas Gerais', 'Paraná', 'Rio de Janeiro', 'São Paulo'],
        Canadá: ['Alberta', 'Columbia Británica', 'Manitoba', 'Ontario', 'Quebec'],
        Chile: ['Antofagasta', 'La Araucanía', 'Maule', 'Santiago', 'Valparaíso'],
        Colombia: ['Antioquia', 'Atlántico', 'Bogotá', 'Cundinamarca', 'Valle del Cauca'],
        España: ['Barcelona', 'Castilla y León', 'Madrid', 'Sevilla', 'Valencia'],
        'Estados Unidos': ['California', 'Florida', 'Illinois', 'Nueva York', 'Texas'],
        México: ['CDMX', 'Jalisco', 'Nuevo León', 'Puebla', 'Yucatán']
    };


    const cities = {
        'Buenos Aires': ['La Plata', 'Mar del Plata', 'Tandil'],
        CABA: ['Caballito', 'Palermo', 'Recoleta'],
        Córdoba: ['Córdoba Capital', 'Río Cuarto', 'Villa Carlos Paz'],
        Mendoza: ['Mendoza Capital', 'San Rafael', 'Tunuyán'],
        "Santa Fe": ['Rosario', 'Rafaela', 'Santa Fe Capital'],
        "São Paulo": ['Campinas', 'Santos', 'São Paulo'],
        'Rio de Janeiro': ['Campos dos Goytacazes', 'Niterói', 'Rio de Janeiro'],
        'Minas Gerais': ['Belo Horizonte', 'Juiz de Fora', 'Uberlândia'],
        Bahia: ['Feira de Santana', 'Salvador', 'Vitória da Conquista'],
        Paraná: ['Curitiba', 'Londrina', 'Maringá'],
        Ontario: ['Mississauga', 'Ottawa', 'Toronto'],
        Quebec: ['Laval', 'Montreal', 'Quebec City'],
        'Columbia Británica': ['Surrey', 'Vancouver', 'Victoria'],
        Alberta: ['Calgary', 'Edmonton', 'Red Deer'],
        Manitoba: ['Brandon', 'Thompson', 'Winnipeg'],
        Santiago: ['Las Condes', 'Providencia', 'Santiago Centro'],
        Valparaíso: ['Quillota', 'Valparaíso', 'Viña del Mar'],
        Antofagasta: ['Antofagasta', 'Calama', 'Taltal'],
        'La Araucanía': ['Pucón', 'Temuco', 'Villarrica'],
        Maule: ['Curicó', 'Linares', 'Talca'],
        Bogotá: ['Bogotá', 'Cali', 'Medellín'],
        Antioquia: ['Envigado', 'Medellín', 'Rionegro'],
        'Valle del Cauca': ['Buenaventura', 'Cali', 'Palmira'],
        Cundinamarca: ['Bogotá', 'Chía', 'Soacha'],
        Atlántico: ['Barranquilla', 'Santa Marta', 'Soledad'],
        Madrid: ['Alcalá de Henares', 'Getafe', 'Madrid'],
        Barcelona: ['Badalona', 'Barcelona', 'Hospitalet de Llobregat'],
        Valencia: ['Alicante', 'Castellón de la Plana', 'Valencia'],
        Sevilla: ['Cádiz', 'Huelva', 'Sevilla'],
        'Castilla y León': ['León', 'Salamanca', 'Valladolid'],
        California: ['Los Ángeles', 'San Diego', 'San Francisco'],
        Texas: ['Austin', 'Dallas', 'Houston'],
        Florida: ['Miami', 'Orlando', 'Tampa'],
        "Nueva York": ['Buffalo', 'Nueva York', 'Rochester'],
        Illinois: ['Chicago', 'Peoria', 'Springfield'],
        CDMX: ['Ciudad de México', 'Coyoacán', 'Xochimilco'],
        Jalisco: ['Guadalajara', 'Puerto Vallarta', 'Tlaquepaque'],
        "Nuevo León": ['Monterrey', 'San Nicolás', 'San Pedro'],
        Puebla: ['Cholula', 'Puebla', 'Tehuacán'],
        Yucatán: ['Mérida', 'Progreso', 'Valladolid']
    };


    const countriesBank = [
        'Argentina', 'Brasil', 'Canadá', 'Chile', 'Colombia', 'Estados Unidos', 'México'
    ];

    const citiesBank = {
        Argentina: [
            'Alta Gracia', 'Caballito', 'Córdoba Capital', 'Concepción', 'Famaillá', 'La Plata', 'Lomas de Zamora',
            'Mar del Plata', 'Mendoza Capital', 'Palermo', 'Recoleta', 'Rafaela', 'Rosario', 'San Miguel de Tucumán',
            'San Rafael', 'San Telmo', 'Tandil', 'Villa Carlos Paz', 'Venado Tuerto'
        ],
        Brasil: [
            'Angra dos Reis', 'Belo Horizonte', 'Campinas', 'Caxias do Sul', 'Contagem', 'Feira de Santana', 'Foz do Iguaçu',
            'Guarulhos', 'Itabuna', 'Juiz de Fora', 'Londrina', 'Maringá', 'Minas Gerais', 'Niterói', 'Pelotas', 'Porto Alegre',
            'Rio de Janeiro', 'Salvador', 'Santa Maria', 'Santos', 'São Paulo', 'Uberlândia', 'Vitória da Conquista'
        ],
        Chile: [
            'Antofagasta', 'Calama', 'Chiguayante', 'Coquimbo', 'Freire', 'La Serena', 'Lima', 'Mendoza', 'Pucón',
            'San Pedro', 'San Pedro de Atacama', 'Santiago', 'Temuco', 'Taltal', 'Talcahuano', 'Valparaíso', 'Vicuña'
        ],
        Colombia: [
            'Bello', 'Bogotá', 'Buenaventura', 'Cali', 'Chía', 'Envigado', 'Itagüí', 'Medellín', 'Palmira', 'Soacha',
            'Tuluá', 'Zipaquirá'
        ],
        'Estados Unidos': [
            'Angeles', 'Atlanta', 'Austin', 'Buffalo', 'Chicago', 'Dallas', 'Florida', 'Houston', 'Los Angeles', 'Miami',
            'New York', 'San Diego', 'San Francisco', 'Washington'
        ],
        México: [
            'Atlixco', 'Celaya', 'Chihuahua', 'Cholula', 'Ciudad Juárez', 'Guadalajara', 'Irapuato', 'León', 'Mérida',
            'Monterrey', 'Puebla', 'Puerto Vallarta', 'San Nicolás', 'Tlalpan', 'Zapopan', 'Tehuacán'
        ],
        Canadá: [
            'Brampton', 'Calgary', 'Edmonton', 'Gatineau', 'Halifax', 'Laval', 'Manitoba', 'Mississauga', 'Montreal',
            'Ottawa', 'Regina', 'Saskatoon', 'Surrey', 'Toronto', 'Vancouver'
        ]
    };

    const accountTypes = ['Ahorro', 'Corriente'];
    const companyTypes = ['Pública', 'Privada', 'Mixta'];
    const relationshipTypes = [
        'Esposo', 'Esposa', 'Hermana', 'Hermano', 'Hija', 'Hijo', 'Madre', 'Padre',
        'Primo', 'Prima', 'Cuñado', 'Cuñada', 'Nieto', 'Nieta'
    ];


    const [companyStatesList, setCompanyStatesList] = useState([]);
    const [companyCitiesList, setCompanyCitiesList] = useState([]);

    const [agentStatesList, setAgentStatesList] = useState([]);
    const [agentCitiesList, setAgentCitiesList] = useState([]);

    const [shareholdersStatesList, setShareholdersStatesList] = useState([]);
    const [shareholdersCitiesList, setShareholdersCitiesList] = useState([]);

    const [setBankCitiesList] = useState([]);

    const handleCountryChange = (e, section) => {
        const country = e.target.value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [`${section}Country`]: country,
            [`${section}State`]: '', // Reinicia el estado
            [`${section}City`]: '', // Reinicia la ciudad
        }));

        if (section === 'international') {
            setBankCitiesList(citiesBank[country] || []); // Manejo para el tipo 'international'
        } else {
            // Maneja las secciones correspondientes para company, agent y shareholders
            if (section === 'company') {
                setCompanyStatesList(states[country] || []);  // Aquí asignas la lista de estados según el país
                setCompanyCitiesList([]);  // Limpia las ciudades
            } else if (section === 'agent') {
                setAgentStatesList(states[country] || []);
                setAgentCitiesList([]);
            } else if (section === 'shareholders') {
                setShareholdersStatesList(states[country] || []); // Aquí asegúrate de que se asignen los estados correctamente
                setShareholdersCitiesList([]);
            }
        }
    };


    const handleStateChange = (e, section) => {
        const state = e.target.value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [`${section}State`]: state,
            [`${section}City`]: '',
        }));

        if (section === 'company') {
            setCompanyCitiesList(cities[state] || []);
        } else if (section === 'agent') {
            setAgentCitiesList(cities[state] || []);
        } else if (section === 'shareholders') {
            setShareholdersCitiesList(cities[state] || []);
        }
    };

    const handleCityChange = (e, section) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [`${section}City`]: e.target.value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [fieldName]: file,
            }));
        }
    };
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;

        setFormData((prevFormData) => {
            // Convierte el campo actual en un array de valores separados por coma
            const currentValue = prevFormData[name] ? prevFormData[name].split(', ') : [];

            let updatedValues;

            if (checked) {
                // Si se marca el checkbox, agregamos el valor al array y lo convertimos en una cadena
                updatedValues = [...currentValue, value].join(', ');
            } else {
                // Si se desmarca el checkbox, eliminamos el valor del array y lo convertimos en una cadena
                updatedValues = currentValue.filter((item) => item !== value).join(', ');
            }

            return {
                ...prevFormData,
                [name]: updatedValues,  // Actualizamos el campo con la nueva cadena
            };
        });
    };



    const validateForm = () => {
        if (!formData.companyName || !formData.companyEmail || !formData.agentName) {
            alert('Por favor, complete todos los campos obligatorios.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const mappedData = mapFormDataToOTC(formData);

        try {
            const response = await axios.post(
                'https://kii.forms.kiivalidator.com/api/kiiex/enterprise',
                mappedData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Formulario enviado exitosamente:', response);
        } catch (error) {
            console.error('Error al enviar el formulario:', error.message);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            {/* Información de la Empresa */}
            <h2>Información de la Empresa</h2>
            <label>
                ID de la empresa:
                <input
                    type="text"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                />
            </label>
            <label>
                Nombre de la empresa:
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Acrónimo de la empresa:
                <input
                    type="text"
                    name="companyAcronym"
                    value={formData.companyAcronym}
                    onChange={handleChange}
                />
            </label>
            <label>
                Tipo de empresa:
                <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un tipo</option>
                    {companyTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Correo electrónico de la empresa:
                <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Dirección de la empresa:
                <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                />
            </label>
            <label>
                País de la empresa:
                <select
                    name="companyCountry"
                    value={formData.companyCountry}
                    onChange={(e) => handleCountryChange(e, 'company')} // Agregar el prefijo correcto
                >
                    <option value="">Seleccione un país</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Estado de la empresa:
                <select
                    name="companyState"
                    value={formData.companyState}
                    onChange={(e) => handleStateChange(e, 'company')}
                    disabled={!formData.companyCountry}
                >
                    <option value="">Seleccione un estado</option>
                    {companyStatesList.length > 0 &&
                        companyStatesList.map((state, index) => (
                            <option key={index} value={state}>
                                {state}
                            </option>
                        ))}
                </select>
            </label>
            <label>
                Ciudad de la empresa:
                <select
                    name="companyCity"
                    value={formData.companyCity}
                    onChange={(e) => handleCityChange(e, 'company')}
                    disabled={!formData.companyState}
                >
                    <option value="">Seleccione una ciudad</option>
                    {companyCitiesList.length > 0 &&
                        companyCitiesList.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                </select>
            </label>

            <label>
                Teléfono de la empresa:
                <input
                    type="tel"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                />
            </label>

            {/* Información del Agente */}
            <h2>Información del Agente</h2>
            <label>
                ID/Passport del Agente:
                <input
                    type="text"
                    name="agentId_passport"
                    value={formData.agentId_passport}
                    onChange={handleChange}
                />
            </label>
            <label>
                Nombre del Agente:
                <input
                    type="text"
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                País de nacimiento del Agente:
                <select
                    name="agentBornCountry"
                    value={formData.agentBornCountry}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un país</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Fecha de nacimiento del Agente:
                <input
                    type="date"
                    name="agentBirthDate"
                    value={formData.agentBirthDate}
                    onChange={handleChange}
                />
            </label>
            <label>
                Correo electrónico del Agente:
                <input
                    type="email"
                    name="agentEmail"
                    value={formData.agentEmail}
                    onChange={handleChange}
                />
            </label>
            <label>
                Dirección del Agente:
                <input
                    type="text"
                    name="agentAddress"
                    value={formData.agentAddress}
                    onChange={handleChange}
                />
            </label>
            <label>
                Teléfono del Agente:
                <input
                    type="tel"
                    name="agentPhone"
                    value={formData.agentPhone}
                    onChange={handleChange}
                />
            </label>
            <label>
                País del Agente:
                <select
                    name="agentCountry"
                    value={formData.agentCountry}
                    onChange={(e) => handleCountryChange(e, 'agent')} // Agregar el prefijo correcto
                >
                    <option value="">Seleccione un país</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Estado del Agente:
                <select
                    name="agentState"
                    value={formData.agentState}
                    onChange={(e) => handleStateChange(e, 'agent')} // Agregar el prefijo correcto
                    disabled={!formData.agentCountry} // Deshabilitado si no hay país seleccionado
                >
                    <option value="">Seleccione un estado</option>
                    {agentStatesList.length > 0 &&
                        agentStatesList.map((state, index) => (
                            <option key={index} value={state}>
                                {state}
                            </option>
                        ))}
                </select>
            </label>

            <label>
                Ciudad del Agente:
                <select
                    name="agentCity"
                    value={formData.agentCity}
                    onChange={(e) => handleCityChange(e, 'agent')} // Agregar el prefijo correcto
                    disabled={!formData.agentState} // Deshabilitado si no hay estado seleccionado
                >
                    <option value="">Seleccione una ciudad</option>
                    {agentCitiesList.length > 0 &&
                        agentCitiesList.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                </select>
            </label>

            <label>
                ¿El Agente está expuesto políticamente?
                <div>
                    <label>
                        <input
                            type="radio"
                            name="agentIsExpose"
                            value="yes"
                            checked={formData.agentIsExpose === 'yes'}
                            onChange={handleChange}
                        />
                        Sí
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="agentIsExpose"
                            value="no"
                            checked={formData.agentIsExpose === 'no'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
            </label>

            <label>
                ¿El Agente es una persona pública?
                <div>
                    <label>
                        <input
                            type="radio"
                            name="agenIisPublic"
                            value="yes"
                            checked={formData.agenIisPublic === 'yes'}
                            onChange={handleChange}
                        />
                        Sí
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="agenIisPublic"
                            value="no"
                            checked={formData.agenIisPublic === 'no'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
            </label>

            <label>
                Nombre de la entidad del Agente:
                <input
                    type="text"
                    name="agentEntityName"
                    value={formData.agentEntityName}
                    onChange={handleChange}
                />
            </label>

            <label>
                ¿El Familiar de una Persona Pública Expuesta?
                <div>
                    <label>
                        <input
                            type="radio"
                            name="agentRelativeExpose"
                            value="yes"
                            checked={formData.agentRelativeExpose === 'yes'}
                            onChange={handleChange}
                        />
                        Sí
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="agentRelativeExpose"
                            value="no"
                            checked={formData.agentRelativeExpose === 'no'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
            </label>


            <label>
                Nombre del Agente Relacionado:
                <input
                    type="text"
                    name="agentRelativeName"
                    value={formData.agentRelativeName}
                    onChange={handleChange}
                />
            </label>

            <label>
                Relación con el Agente:
                <select
                    name="agentRelationshipExpose"
                    value={formData.agentRelationshipExpose}
                    onChange={handleChange}
                >
                    <option value="">Seleccione la relación</option>
                    {relationshipTypes.map((relationship, index) => (
                        <option key={index} value={relationship}>
                            {relationship}
                        </option>
                    ))}
                </select>
            </label>

            {/* Información del Agente */}
            <h2>Información del Accionista</h2>
            {formData.shareholders.map((shareholder) => (
                <div key={shareholder.id} className="shareholder-form">
                    <label>
                        ID/Passport del Accionista:
                        <input
                            type="text"
                            name="shareholdersId_passport"
                            value={shareholder.shareholdersId_passport}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>
                    <label>
                        Nombre del Accionista:
                        <input
                            type="text"
                            name="shareholdersName"
                            value={shareholder.shareholdersName}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>
                    <label>
                        País de nacimiento del Accionista:
                        <select
                            name="shareholdersBornCountry"
                            value={shareholder.shareholdersBornCountry}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        >
                            <option value="">Seleccione un país</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Fecha de nacimiento del Accionista:
                        <input
                            type="date"
                            name="shareholdersBirthDate"
                            value={shareholder.shareholdersBirthDate}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>
                    <label>
                        Correo electrónico del Accionista:
                        <input
                            type="email"
                            name="shareholdersEmail"
                            value={shareholder.shareholdersEmail}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>
                    <label>
                        Dirección del Accionista:
                        <input
                            type="text"
                            name="shareholdersAddress"
                            value={shareholder.shareholdersAddress}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>
                    <label>
                        Teléfono del Accionista:
                        <input
                            type="tel"
                            name="shareholdersPhone"
                            value={shareholder.shareholdersPhone}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>

                    <label>
                        País del Accionista:
                        <select
                            name="shareholdersCountry"
                            value={shareholder.shareholdersCountry}
                            onChange={(e) => handleShareholderChange(e, shareholder.id, 'shareholders')}
                            required
                        >
                            <option value="" disabled>Seleccione un país</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Estado del Accionista:
                        <select
                            name="shareholdersState"
                            value={shareholder.shareholdersState}
                            onChange={(e) => handleShareholderStateChange(e, shareholder.id)}
                            disabled={!shareholder.shareholdersCountry} // Solo habilitado si se selecciona un país
                        >
                            <option value="">Seleccione un estado</option>
                            {shareholder.shareholdersCountry && shareholdersStatesList[shareholder.shareholdersCountry]?.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Ciudad del Accionista:
                        <select
                            name="shareholdersCity"
                            value={shareholder.shareholdersCity}
                            onChange={(e) => handleShareholderCityChange(e, shareholder.id)}
                            disabled={!shareholder.shareholdersState} // Solo habilitado si se selecciona un estado
                        >
                            <option value="">Seleccione una ciudad</option>
                            {shareholder.shareholdersState && shareholdersCitiesList[shareholder.shareholdersState]?.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </label>


                    <label>
                        ¿El Accionista está expuesto políticamente?
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="shareholdersIsExpose"
                                    value="yes"
                                    checked={shareholder.shareholdersIsExpose === 'yes'}
                                    onChange={(e) => handleShareholderChange(e, shareholder.id)}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shareholdersIsExpose"
                                    value="no"
                                    checked={shareholder.shareholdersIsExpose === 'no'}
                                    onChange={(e) => handleShareholderChange(e, shareholder.id)}
                                />
                                No
                            </label>
                        </div>
                    </label>
                    <label>
                        ¿El Accionista es una persona pública?
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="shareholdersIsPublic"
                                    value="yes"
                                    checked={shareholder.shareholdersIsPublic === 'yes'}
                                    onChange={(e) => handleShareholderChange(e, shareholder.id)}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shareholdersIsPublic"
                                    value="no"
                                    checked={shareholder.shareholdersIsPublic === 'no'}
                                    onChange={(e) => handleShareholderChange(e, shareholder.id)}
                                />
                                No
                            </label>
                        </div>
                    </label>
                    <label>
                        Nombre de la entidad del Accionista:
                        <input
                            type="text"
                            name="shareholdersEntityName"
                            value={shareholder.shareholdersEntityName}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>
                    <label>
                        ¿El Familiar de una Persona Pública Expuesta?
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="shareholdersRelativeExpose"
                                    value="yes"
                                    checked={shareholder.shareholdersRelativeExpose === 'yes'}
                                    onChange={(e) => handleShareholderChange(e, shareholder.id)}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shareholdersRelativeExpose"
                                    value="no"
                                    checked={shareholder.shareholdersRelativeExpose === 'no'}
                                    onChange={(e) => handleShareholderChange(e, shareholder.id)}
                                />
                                No
                            </label>
                        </div>
                    </label>

                    <label>
                        Nombre de la persona Publicamente Expuesta (PPE):
                        <input
                            type="text"
                            name="shareholdersRelativeName"
                            value={formData.shareholdersRelativeName}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        />
                    </label>

                    <label>
                        Relación con PPE:
                        <select
                            name="shareholdersRelationshipExpose"
                            value={formData.shareholdersRelationshipExpose}
                            onChange={(e) => handleShareholderChange(e, shareholder.id)}
                        >
                            <option value="">Seleccione la relación</option>
                            {relationshipTypes.map((relationship, index) => (
                                <option key={index} value={relationship}>
                                    {relationship}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Botón para eliminar un accionista */}
                    <button type="button" onClick={() => removeShareholder(shareholder.id)}>
                        Eliminar Accionista
                    </button>
                </div>
            ))}

            {/* Botón para añadir un accionista */}
            <button type="button" onClick={addShareholder}>
                Añadir Accionista
            </button>



            {/* Mostrar formulario de traders */}
            {formData.traders.map((trader) => (
                <div key={trader.id} className="trader-form">
                    <label>
                        ID/Passport del Trader:
                        <input
                            type="text"
                            name="tradersId_passport"
                            value={trader.tradersId_passport}
                            onChange={(e) => handleTraderChange(e, trader.id)}
                        />
                    </label>
                    <label>
                        Nombre del Trader:
                        <input
                            type="text"
                            name="tradersName"
                            value={trader.tradersName}
                            onChange={(e) => handleTraderChange(e, trader.id)}
                        />
                    </label>
                    <label>
                        Correo electrónico del Trader:
                        <input
                            type="email"
                            name="tradersEmail"
                            value={trader.tradersEmail}
                            onChange={(e) => handleTraderChange(e, trader.id)}
                        />
                    </label>
                    <label>
                        Teléfono del Trader:
                        <input
                            type="tel"
                            name="tradersPhone"
                            value={trader.tradersPhone}
                            onChange={(e) => handleTraderChange(e, trader.id)}
                        />
                    </label>

                    {/* Botón para eliminar un trader */}
                    <button type="button" onClick={() => removeTrader(trader.id)}>
                        Eliminar Trader
                    </button>
                </div>
            ))}

            {/* Botón para añadir un trader */}
            <button type="button" onClick={addTrader}>
                Añadir Trader
            </button>

            {/* Información Financiera */}
            <h2>Información Financiera</h2>
            <label>
                Activos Totales USD:
                <div>
                    <label>
                        <input
                            type="radio"
                            name="financialAssets"
                            value="< $500,000"
                            checked={formData.financialMainCurrency === "< $500,000"}
                            onChange={handleChange}
                        />
                        &lt; $500,000
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="financialAssets"
                            value="$500,000 - $1,000,000"
                            checked={formData.financialAssets === "$500,000 - $1,000,000"}
                            onChange={handleChange}
                        />
                        $500,000 - $1,000,000
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="financialAssets"
                            value="$1,000,000 - $2,000,000"
                            checked={formData.financialAssets === "$1,000,000 - $2,000,000"}
                            onChange={handleChange}
                        />
                        $1,000,000 - $2,000,000
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="financialAssets"
                            value="$2,000,000 - $5,000,000"
                            checked={formData.financialAssets === "$2,000,000 - $5,000,000"}
                            onChange={handleChange}
                        />
                        $2,000,000 - $5,000,000
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="financialAssets"
                            value="$5,000,000 - $10,000,000"
                            checked={formData.financialAssets === "$5,000,000 - $10,000,000"}
                            onChange={handleChange}
                        />
                        $5,000,000 - $10,000,000
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="financialAssets"
                            value=">= $10,000,000"
                            checked={formData.financialAssets === ">= $10,000,000"}
                            onChange={handleChange}
                        />
                        &gt;= $10,000,000
                    </label>
                </div>
            </label>

            <label>
                Monedas en las que hace trading:
                <div>
                    {['USDT', 'USDC', 'BUSD', 'BNB', 'ETH', 'DAI', 'BTC', 'XRP'].map((coin, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="financialCoins"
                                value={coin}
                                checked={formData.financialCoins.split(', ').includes(coin)}
                                onChange={handleCheckboxChange}
                            />
                            {coin}
                        </label>
                    ))}
                </div>
            </label>


            <label>
                Otras monedas:
                <input
                    type="text"
                    name="financialOtherCoins"
                    value={formData.financialOtherCoins}
                    onChange={handleChange}
                />
            </label>

            <label>
                Operación diaria:
                <input
                    type="text"
                    name="financialDaily"
                    value={formData.financialDaily}
                    onChange={handleChange}
                />
            </label>

            <h2>Información Bancaria</h2>

            {/* Mostrar formulario de cuentas bancarias */}
            {formData.bankAccounts.map((bankAccount) => (
                <div key={bankAccount.id} className="bank-form">
                    <label>
                        Cuenta Bancaria:
                        <input
                            type="text"
                            name="bankAccount"
                            value={bankAccount.bankAccount}
                            onChange={(e) => handleBankChange(e, bankAccount.id)}
                        />
                    </label>

                    <label>
                        Nombre del Banco:
                        <input
                            type="text"
                            name="bankName"
                            value={bankAccount.bankName}
                            onChange={(e) => handleBankChange(e, bankAccount.id)}
                        />
                    </label>

                    <label>
                        Tipo de Banco:
                        <select
                            name="bankType"
                            value={bankAccount.bankType}
                            onChange={(e) => handleBankChange(e, bankAccount.id)}
                        >
                            <option value="">Seleccione un tipo</option>
                            {accountTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        País del Banco:
                        <select
                            name="bankCountry"
                            value={bankAccount.bankCountry}
                            onChange={(e) => handleBankChange(e, bankAccount.id)}
                        >
                            <option value="">Seleccione un país</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        SWIFT del Banco:
                        <input
                            type="text"
                            name="bankSwift"
                            value={bankAccount.bankSwift}
                            onChange={(e) => handleBankChange(e, bankAccount.id)}
                        />
                    </label>

                    {/* Botón para eliminar una cuenta bancaria */}
                    <button type="button" onClick={() => removeBankAccount(bankAccount.id)}>
                        Eliminar Cuenta Bancaria
                    </button>
                </div>
            ))}

            {/* Botón para añadir una cuenta bancaria */}
            <button type="button" onClick={addBankAccount}>
                Añadir Cuenta Bancaria
            </button>

            <h2>Información del Wallet</h2>

            {/* Mostrar formulario de wallets */}
            {formData.wallets.map((wallet) => (
                <div key={wallet.id} className="wallet-form">
                    <label>
                        Dirección del Wallet:
                        <input
                            type="text"
                            name="walletAddress"
                            value={wallet.walletAddress}
                            onChange={(e) => handleWalletChange(e, wallet.id)}
                        />
                    </label>
                    <label>
                        Moneda del Wallet:
                        <input
                            type="text"
                            name="walletCurrency"
                            value={wallet.walletCurrency}
                            onChange={(e) => handleWalletChange(e, wallet.id)}
                        />
                    </label>

                    {/* Botón para eliminar un wallet */}
                    <button type="button" onClick={() => removeWallet(wallet.id)}>
                        Eliminar Wallet
                    </button>
                </div>
            ))}

            {/* Botón para añadir un wallet */}
            <button type="button" onClick={addWallet}>
                Añadir Wallet
            </button>

            {/* Operaciones Internacionales */}
            <h2>Operaciones Internacionales</h2>
            <label>
                ¿Tiene operaciones internacionales?
                <div>
                    <label>
                        <input
                            type="radio"
                            name="internationalOperations"
                            value="yes"
                            checked={formData.internationalOperations === 'yes'}
                            onChange={handleChange}
                        />
                        Sí
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="internationalOperations"
                            value="no"
                            checked={formData.internationalOperations === 'no'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
            </label>

            <label>
                Banco internacional:
                <input
                    type="text"
                    name="internationalBank"
                    value={formData.internationalBank}
                    onChange={handleChange}
                />
            </label>
            <label>
                Tipo de cuenta internacional:
                <select
                    name="internationalAccountType"
                    value={formData.internationalAccountType}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un tipo de cuenta</option>
                    {accountTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Número de cuenta internacional:
                <input
                    type="text"
                    name="internationalAccountNumber"
                    value={formData.internationalAccountNumber}
                    onChange={handleChange}
                />
            </label>

            <label>
                País del Banco:
                <select
                    name="internationalAccountCountry"
                    value={formData.internationalAccountCountry}
                    onChange={(e) => setFormData({
                        ...formData,
                        internationalAccountCountry: e.target.value,
                        internationalAccountCity: "",  // Reseteamos la ciudad al cambiar el país
                    })}
                >
                    <option value="">Seleccione un país</option>
                    {countriesBank.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Ciudad del Banco:
                <select
                    name="internationalAccountCity"
                    value={formData.internationalAccountCity}
                    onChange={(e) => setFormData({
                        ...formData,
                        internationalAccountCity: e.target.value,
                    })}
                    disabled={!formData.internationalAccountCountry} // Deshabilitado si no hay país seleccionado
                >
                    <option value="">Seleccione una ciudad</option>
                    {formData.internationalAccountCountry && citiesBank[formData.internationalAccountCountry] &&
                        citiesBank[formData.internationalAccountCountry].map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                </select>
            </label>

            <label>
                Monedas de la Operación:
                <div>
                    {['Dólares', 'Euros'].map((operation, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="internationalCurrency"
                                value={operation}
                                checked={formData.internationalCurrency.split(', ').includes(operation)} // Verifica si la opción está seleccionada
                                onChange={handleCheckboxChange}
                            />
                            {operation}
                        </label>
                    ))}
                </div>
            </label>

            <label>
                Tipo de operación internacional:
                <div>
                    {['Importación', 'Inversiones', 'Exportación', 'Transferencia', 'Préstamos', 'Pago Servicios'].map((operation, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="internationalOperationsType"
                                value={operation}
                                checked={formData.internationalOperationsType.split(', ').includes(operation)} // Verifica si la operación está seleccionada
                                onChange={handleCheckboxChange}
                            />
                            {operation}
                        </label>
                    ))}
                </div>
            </label>



            <label>
                Otro tipo de operación:
                <input
                    type="text"
                    name="internationalOtherOperations"
                    value={formData.internationalOtherOperations}
                    onChange={handleChange}
                />
            </label>

            <label>
                Otra moneda internacional:
                <input
                    type="text"
                    name="internationalOtherCurrency"
                    value={formData.internationalOtherCurrency}
                    onChange={handleChange}
                />
            </label>

            {/* Documentos */}
            <h2>Documentos</h2>
            <label>
                Nombre de usuario de Kiiex:
                <input
                    type="text"
                    name="kiiexUserName"
                    value={formData.kiiexUserName}
                    onChange={handleChange}
                />
            </label>

            <label>
                Correo electrónico de Kiiex:
                <input
                    type="email"
                    name="kiiexEmail"
                    value={formData.kiiexEmail}
                    onChange={handleChange}
                />
            </label>

            <label>
                Registro de Documento:
                <input
                    type="file"
                    name="docRegister"
                    onChange={(e) => handleFileChange(e, 'docRegister')}
                />
            </label>

            <label>
                RUT del Documento:
                <input
                    type="file"
                    name="docRut"
                    onChange={(e) => handleFileChange(e, 'docRut')}
                />
            </label>

            <label>
                Representante Legal del Documento:
                <input
                    type="file"
                    name="docReprentativeLegal"
                    onChange={(e) => handleFileChange(e, 'docReprentativeLegal')}
                />
            </label>

            <label>
                Residencia del Representante:
                <input
                    type="file"
                    name="docResidenceRepresentative"
                    onChange={(e) => handleFileChange(e, 'docResidenceRepresentative')}
                />
            </label>

            <label>
                Documento del Representante de la Compañía:
                <input
                    type="file"
                    name="docCompanyRepresentative"
                    onChange={(e) => handleFileChange(e, 'docCompanyRepresentative')}
                />
            </label>

            <label>
                Estados Bancarios:
                <input
                    type="file"
                    name="docBankStatements"
                    onChange={(e) => handleFileChange(e, 'docBankStatements')}
                />
            </label>

            <label>
                Estructura de Participación:
                <input
                    type="file"
                    name="docShareholdingStructure"
                    onChange={(e) => handleFileChange(e, 'docShareholdingStructure')}
                />
            </label>

            <label>
                Documentos de Accionistas:
                <input
                    type="file"
                    name="docShareholders"
                    onChange={(e) => handleFileChange(e, 'docShareholders')}
                />
            </label>

            <label>
                Bio del Rubro:
                <input
                    type="file"
                    name="docRubBio"
                    onChange={(e) => handleFileChange(e, 'docRubBio')}
                />
            </label>

            <label>
                Licencia Profesional:
                <input
                    type="file"
                    name="docProfessionalLicense"
                    onChange={(e) => handleFileChange(e, 'docProfessionalLicense')}
                />
            </label>

            <label>
                Estados Financieros Certificados:
                <input
                    type="file"
                    name="docCertifiedFinancial_statements"
                    onChange={(e) => handleFileChange(e, 'docCertifiedFinancial_statements')}
                />
            </label>

            <label>
                Declaración Tributaria de la Compañía:
                <input
                    type="file"
                    name="docCompanyTaxReturn"
                    onChange={(e) => handleFileChange(e, 'docCompanyTaxReturn')}
                />
            </label>

            <label>
                Documento LAFT:
                <input
                    type="file"
                    name="docLaft"
                    onChange={(e) => handleFileChange(e, 'docLaft')}
                />
            </label>

            <label>
                Reportes LAFT:
                <input
                    type="file"
                    name="docLaft_reports"
                    onChange={(e) => handleFileChange(e, 'docLaft_reports')}
                />
            </label>


            {/*Declaración de aceptación */}
            <label>
                Acepto la declaración de fondos:
                <input
                    type="checkbox"
                    name="acceptFundDeclaration"
                    checked={formData.acceptFundDeclaration}
                    onChange={handleChange}
                />
            </label>
            <label>
                Acepto el uso de datos:
                <input
                    type="checkbox"
                    name="acceptDataUse"
                    checked={formData.acceptDataUse}
                    onChange={handleChange}
                />
            </label>

            {/* Envío del formulario */}
            <button type="submit">Enviar</button>
        </form >
    );
};
export default Form;
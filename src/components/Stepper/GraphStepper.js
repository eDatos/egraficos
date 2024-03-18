import React, {useRef, useState} from 'react';
import { Stepper } from 'react-dynamic-stepper';
import { FaCloudUploadAlt, FaChartBar, FaMap, FaPalette, FaShareAlt } from 'react-icons/fa';


function GraphStepper() {
const [stepsState, setStepsState] = useState({
    acceptFirstTerms: {
        checked: false,
        touched: false,
    },
    acceptSecondTerms: {
        checked: false,
        touched: false,
    },
    acceptThirdTerms: {
        checked: false,
        touched: false,
    },
    acceptFourthTerms: {
        checked: false,
        touched: false,
    },
    acceptFifthTerms: {
        checked: false,
        touched: false,
    }
});

const firstTermsHandler = () => {
    setStepsState(prevState => ({
        ...prevState,
        acceptFirstTerms: {
            ...prevState.acceptFirstTerms,
            checked: !prevState.acceptFirstTerms.checked,
            touched: true
        }
    }));
};

const [isSecondStepLoading, setIsSecondStepLoading] = useState(false);

const secondStepAsyncFunc = async () => {
    try {
        // Simulación de una llamada API
        setIsSecondStepLoading(true);
        await timeout(3000);
        console.log('second step clicked');
    } catch (error) {
        console.log(error);
        // Si hay un error, no navegamos al siguiente paso
        throw error;
    } finally {
        setIsSecondStepLoading(false);
    }
};

const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


const stepsWithIcons = [
    {
        header: {
            label: <><FaCloudUploadAlt /> Cargar datos </>,
            indicator: '1' ,
            text: 'Cargar datos'
        },

        isError: !stepsState.acceptFirstTerms.checked && stepsState.acceptFirstTerms.touched,
        isComplete: stepsState.acceptFirstTerms.checked
    },
    {
        header: {
            label: <><FaChartBar /> Escoger gráfico</>,
            //<Trans i18nKey="global.section.loaddata.edatos.name"></Trans>,
            indicator: '2',
            text: 'Escoger gráfico'
        },
        content: (
            <div>
                <p>Escoger gráfico</p>
            </div>
        ),
        onClickHandler: () => secondStepAsyncFunc(),
        isLoading: isSecondStepLoading,
        isError: !stepsState.acceptSecondTerms.checked && stepsState.acceptSecondTerms.touched,
        isComplete: stepsState.acceptSecondTerms.checked,
    },
    {
        header: {
            label: <><FaMap /> Mapear </>,
            indicator: '3',
            text: 'Mapear'
        },
        content: (
            <div>
                <p>Mapear</p>
            </div>
        ),
        isError: !stepsState.acceptThirdTerms.checked && stepsState.acceptThirdTerms.touched,
        isComplete: stepsState.acceptThirdTerms.checked,
    },
    {
        header: {
            label: <><FaPalette /> Personalizar </>,
            indicator: '4',
            text: 'Personalizar'
        },
        content: (
            <div>
                <p>Personalizar</p>
            </div>
        ),
        isError: !stepsState.acceptFourthTerms.checked && stepsState.acceptFourthTerms.touched,
        isComplete: stepsState.acceptFourthTerms.checked,
    },
    {
        header: {
            label: <><FaShareAlt /> Exportar </>,
            indicator: '5',
            text: 'Exportar'
        },
        content: (
            <div>
                <p>Exportar</p>
            </div>
        ),
        isError: !stepsState.acceptFifthTerms.checked && stepsState.acceptFifthTerms.touched,
        isComplete: stepsState.acceptFifthTerms.checked,
    },
];

const submitStepper = () => {
    console.log('submitted');
};

return (
    <div>
        <Stepper
            steps={stepsWithIcons}
            footerData={{
                submitHandler: submitStepper,
            }}
        />
    </div>
);
}

export default GraphStepper;

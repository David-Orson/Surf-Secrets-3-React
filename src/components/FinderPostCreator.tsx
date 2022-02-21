// npm
import React, { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DateAdapter from '@mui/lab/AdapterDayjs';

// mui
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import OptionUnstyled, {
    optionUnstyledClasses,
} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

import SelectUnstyled, {
    SelectUnstyledProps,
    selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';

import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';

// hooks
import { useServices } from '../api/services';
import { useActions } from '../redux/actions';

// models
import { FinderPost, SurfMap } from '../api/models';
import { RootState } from '../redux/store';

function CustomSelect<TValue extends {}>(props: SelectUnstyledProps<TValue>) {
    const components: SelectUnstyledProps<TValue>['components'] = {
        Root: StyledButton,
        Listbox: StyledListbox,
        Popper: StyledPopper,
        ...props.components,
    };

    return <SelectUnstyled {...props} components={components} />;
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 320px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 0.75em;
    margin: 0.5em;
    padding: 10px;
    text-align: left;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      outline: 3px solid ${
          theme.palette.mode === 'dark' ? blue[600] : blue[100]
      };
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `
);

const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 320px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 0.75em;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    overflow: auto;
    outline: 0px;
    `
);

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      background-color: ${
          theme.palette.mode === 'dark' ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.highlighted} {
      background-color: ${
          theme.palette.mode === 'dark' ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${
          theme.palette.mode === 'dark' ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${
          theme.palette.mode === 'dark' ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `
);

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
`;

// local types
interface Props {
    setIsCreateVisible: Function;
    refreshTable: Function;
}

const FinderPostCreator = (props: Props) => {
    // hooks
    const { createFinderPost, getAllMaps } = useServices();
    const { addFinderPostId } = useActions();

    // reactive
    const [isLoading, setIsLoading] = useState(false);
    const [maps, setMaps] = useState<SurfMap[]>([]);
    const [map, setMap] = useState<SurfMap | null>({} as SurfMap);
    const [time, setTime] = useState<Date | null>(new Date());

    const account = useSelector((state: RootState) => state.account);

    // methods
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        const finderPost = {} as FinderPost;

        finderPost.team = [account.id];
        finderPost.maps = [map as SurfMap];
        finderPost.time = time as Date;

        const resPost = await createFinderPost(finderPost);

        addFinderPostId(resPost.id);

        props.refreshTable();

        setIsLoading(false);
        props.setIsCreateVisible(false);
    };

    // lifecycle
    useEffect(() => {
        let cancelled = false;

        const request = async () => {
            setMaps(await getAllMaps());
            if (cancelled) return;
        };

        request();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="flex justify-center flex-col items-center">
            <div className="m-4">
                <Typography variant="h5">Create Match Finder Post</Typography>
            </div>
            <form
                className="w-full flex justify-center items-center flex-col"
                noValidate
                onSubmit={submit}
            >
                <CustomSelect value={map} onChange={setMap}>
                    {maps.map((map) => (
                        <StyledOption key={map.id} value={map}>
                            {map.name}
                        </StyledOption>
                    ))}
                </CustomSelect>

                <LocalizationProvider dateAdapter={DateAdapter}>
                    <TimePicker
                        label="Time"
                        value={time}
                        onChange={(newTime) => setTime(newTime)}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isLoading}
                >
                    Create
                </LoadingButton>
            </form>
        </div>
    );
};

export default FinderPostCreator;

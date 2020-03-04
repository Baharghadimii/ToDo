import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    border: '2% solid blue'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: 'blue'
  },
}));

export default function DropDown(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({});

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    props.onSelect({ [name]: event.target.value })
  };


  return (
    <div>
      <FormControl style={{ color: 'blue', borderColor: 'blue' }} variant="outlined" className={classes.formControl}>
        <InputLabel style={{ color: 'blue' }} ref={inputLabel} htmlFor="outlined-age-native-simple">
          Group
        </InputLabel>
        <Select
          native
          value={state.name}
          onChange={handleChange('group')}
          labelWidth={labelWidth}
          inputProps={{
            name: 'group',
            id: 'outlined-age-native-simple',
          }}>
          <option value="" />
          <option value={'movie'}>Movie</option>
          <option value={'book'}>Book</option>
          <option value={'product'}>Product</option>
          <option value={'business'}>Restaurant</option>
        </Select>
      </FormControl>
    </div>
  );
}
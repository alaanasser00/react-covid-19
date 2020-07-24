import React, { useState, useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

import PropTypes from 'prop-types';

// [BEGIN] Material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
// [END] Material-ui imports



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Country' },
    { id: 'cases', numeric: true, disablePadding: false, label: 'Cases' },
    { id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths' },
    { id: 'recovered', numeric: true, disablePadding: false, label: 'Recovered' },
    { id: 'active', numeric: true, disablePadding: false, label: 'Active' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell className="tableHead"
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingTop: '27px'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        boxShadow: 'none',
    },
    container: {
        maxHeight: 295,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
}));

const CountryList = () => {
    // Retrieve Context Data
    const { countriesData } = useContext(DataContext);
    const [data,] = countriesData;

    const classes = useStyles();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('cases');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div className="card">
            <h2>Countries List</h2>
            <div className={classes.root}>
                <Paper className={classes.paper} >
                    <TableContainer className={classes.container}>
                        <Table
                            stickyHeader
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {stableSort(data, getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow className="tableBody"
                                                tabIndex={-1}
                                                key={row.country}
                                            >
                                                <TableCell component="th" id={labelId} scope="row">
                                                    {row.country}
                                                </TableCell>
                                                <TableCell align="right">{row.cases}</TableCell>
                                                <TableCell align="right">{row.deaths}</TableCell>
                                                <TableCell align="right">{row.recovered}</TableCell>
                                                <TableCell align="right">{row.active}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
}

export default CountryList;
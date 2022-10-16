import React from "react";
import { ToggleState, EntryType, Role} from 'src/constants';
import './styles.css';

const Table = ({ data, onDelete, onEdit, onToggle }) =>{

    const renderEntry = (value, type, row) =>{
        switch(type){
            case EntryType.IMAGE:
                return <img src={value} />;
            case EntryType.DATE:
                return new Date(value).toDateString()
            case EntryType.Role:
                if (value === Role.ADMIN)
                return (
                    <button
                       onClick={()=>onToggle(row)}
                       className="admin">
                        Admin
                       </button>
                )
                if (value === Role.SUPER_ADMIN)
                  return(
                    <button
                      onClick={()=> onToggle(row)}
                      className="super-admin">
                        Super Admin
                      </button>
                )
            case EntryType.TOGGLE:
                if(value === ToggleState.PENDING)
                   return (
                     <button  
                       onClick={()=>onToggle(row)}
                       className="pending">
                        Pending
                    </button>
                );
                if (value === ToggleState.ACCEPTED)
                   return (
                            <button
                            onClick={()=>onToggle(row)}
                            className="accepted">
                                Accepted
                        </button>   
                    );

                /* else ...*/
                return (
                    <button 
                    onClick={() => onToggle(row)} 
                    className="rejected">
                    Rejected
                </button>
                );
            case EntryType.TEXT:
            case EntryType.NUMBER:
            default:
                return value;
        }
    }

    return(
        <div className="table-holder">
            <table className="table">
                <thead>
                    <tr>
                        {data.columns.map(column =>(
                            <th key={column.title}>{column.title}</th>
                        ))}

                        {/* editable? */}
                        {onEdit && <th>Delete</th>}

                        {/* deletable? */}
                        {onDelete && <th>Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map((row, rIndex)=>(
                        <tr key={rIndex}>
                            {data.columns.map((column, cIndex)=>(
                                <td key={`${rIndex}${cIndex}`}>
                                    { renderEntry(row[column.key], column.type, row)}
                                </td>
                            ))}

                            {/** editable */}
                            {onEdit &&
                                <td>
                                    <button onClick={() => onEdit(row)} className="edit-act">
                                        Edit
                                    </button>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.rows.length === 0 &&
                       <p className="text-center w-100">No data available</p>
                    }
        </div>
    );
}

export default Table;
#
# Autogenerated by Thrift Compiler (0.16.0)
#
# DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
#
#  options string: py:new_style,no_utf8strings
#

from thrift.Thrift import TType, TMessageType, TFrozenDict, TException, TApplicationException
from thrift.protocol.TProtocol import TProtocolException
from thrift.TRecursive import fix_spec

from .ttypes import *
TErrorMessage = [
    "",
    "<UNUSED>",
    "$0",
    "Cancelled",
    "$0",
    "$0",
    "$0",
    "$0",
    "$0",
    "$0",
    "Parquet files should not be split into multiple hdfs-blocks. file=$0",
    "Column metadata states there are $0 values, but read $1 values from column $2. file=$3",
    "(unused)",
    "ParquetScanner: reached EOF while deserializing data page header. file=$0",
    "Metadata states that in group $0($1) there are $2 rows, but $3 rows were read.",
    "(unused)",
    "File '$0' column '$1' does not have the decimal precision set.",
    "File '$0' column '$1' has a precision that does not match the table metadata  precision. File metadata precision: $2, table metadata precision: $3.",
    "File '$0' column '$1' does not have converted type set to DECIMAL",
    "File '$0' column '$1' contains decimal data but the table metadata has type $2",
    "Problem parsing file $0 at $1$2",
    "Decompressor: block size is too big.  Data is likely corrupt. Size: $0",
    "Decompressor: invalid compressed length.  Data is likely corrupt.",
    "Snappy: GetUncompressedLength failed",
    "SnappyBlock: RawUncompress failed",
    "Snappy: Decompressed size is not correct.",
    "Reserved resource size ($0) is larger than query mem limit ($1), and will be restricted to $1. Configure the reservation size by setting RM_INITIAL_MEM.",
    "Cannot perform join at hash join node with id $0. The input data was partitioned the maximum number of $1 times. This could mean there is significant skew in the data or the memory limit is set too low.",
    "Cannot perform aggregation at hash aggregation node with id $0. The input data was partitioned the maximum number of $1 times. This could mean there is significant skew in the data or the memory limit is set too low.",
    "Builtin '$0' with symbol '$1' does not exist. Verify that all your impalads are the same version.",
    "RPC Error: $0",
    "RPC recv timed out: dest address: $0, rpc: $1",
    "Failed to verify function $0 from LLVM module $1, see log for more details.",
    "File $0 corrupt. RLE level data bytes = $1",
    "Column '$0' has conflicting Avro decimal types. Table schema $1: $2, file schema $1: $3",
    "Column '$0' has conflicting Avro decimal types. Declared $1: $2, $1 in table's Avro schema: $3",
    "Unresolvable types for column '$0': table type: $1, file type: $2",
    "Unresolvable types for column '$0': declared column type: $1, table's Avro schema type: $2",
    "Field $0 is missing from file and default values of type $1 are not yet supported.",
    "Inconsistent table metadata. Mismatch between column definition and Avro schema: cannot read field $0 because there are only $1 fields.",
    "Field $0 is missing from file and does not have a default value.",
    "Field $0 is nullable in the file schema but not the table schema.",
    "Inconsistent table metadata. Field $0 is not a record in the Avro schema.",
    "Could not read definition level, even though metadata states there are $0 values remaining in data page. file=$1",
    "Mismatched number of values in column index $0 ($1 vs. $2). file=$3",
    "File '$0' is corrupt: error decoding dictionary-encoded value of type $1 at offset $2",
    "SSL private-key password command ('$0') failed with error: $1",
    "The SSL certificate path is blank",
    "The SSL private key path is blank",
    "The SSL certificate file does not exist at path $0",
    "The SSL private key file does not exist at path $0",
    "SSL socket creation failed: $0",
    "Memory allocation of $0 bytes failed",
    "Could not read repetition level, even though metadata states there are $0 values remaining in data page. file=$1",
    "File '$0' has an incompatible Parquet schema for column '$1'. Column type: $2, Parquet schema:\n$3",
    "Failed to allocate $0 bytes for collection '$1'.\nCurrent buffer size: $2 num tuples: $3.",
    "Temporary device for directory $0 is blacklisted from a previous error and cannot be used.",
    "Temporary file $0 is blacklisted from a previous error and cannot be expanded.",
    "RPC client failed to connect: $0",
    "Metadata for file '$0' appears stale. Try running \"refresh $1\" to reload the file metadata.",
    "File '$0' has an invalid version number: $1\nThis could be due to stale metadata. Try running \"refresh $2\".",
    "Tried to read $0 bytes but could only read $1 bytes. This may indicate data file corruption. (file $2, byte offset: $3)",
    "Invalid read of $0 bytes. This may indicate data file corruption. (file $1, byte offset: $2)",
    "File '$0' has an invalid version header: $1\nMake sure the file is an Avro data file.",
    "$0's allocations exceeded memory limits.",
    "No longer in use.",
    "For better performance, snappy-, gzip-, and bzip-compressed files should not be split into multiple HDFS blocks. file=$0 offset $1",
    "$0 Data error, likely data corrupted in this block.",
    "$0 Decompressor error at $1, code=$2",
    "Decompression failed to make progress, but end of input is not reached. File appears corrupted. file=$0",
    "Unexpected end of compressed file. File may be truncated. file=$0",
    "Sender$0 timed out waiting for receiver fragment instance: $1, dest node: $2",
    "Kudu type $0 is not available in Impala.",
    "Impala type $0 is not available in Kudu.",
    "Kudu is not supported on this operating system.",
    "Kudu features are disabled by the startup flag --disable_kudu.",
    "Cannot perform hash join at node with id $0. Repartitioning did not reduce the size of a spilled partition. Repartitioning level $1. Number of rows $2:\n$3\n$4",
    "Not in use.",
    "File '$0' is corrupt: truncated data block at offset $1",
    "File '$0' is corrupt: invalid union value $1 at offset $2",
    "File '$0' is corrupt: invalid boolean value $1 at offset $2",
    "File '$0' is corrupt: invalid length $1 at offset $2",
    "File '$0' is corrupt: invalid encoded integer at offset $1",
    "File '$0' is corrupt: invalid record count $1 at offset $2",
    "File '$0' is corrupt: invalid compressed block size $1 at offset $2",
    "File '$0' is corrupt: invalid metadata count $1 at offset $2",
    "File '$0' could not be read: string $1 was longer than supported limit of $2 bytes at offset $3",
    "File '$0' is corrupt: error decoding value of type $1 at offset $2",
    "File '$0' is corrupt: error reading dictionary for data of type $1: $2",
    "Length of column is $0 which exceeds maximum supported length of 2147483647 bytes.",
    "Scratch space limit of $0 bytes exceeded for query while spilling data to disk on backend $1.",
    "Unexpected error allocating $0 byte buffer: $1",
    "File '$0' is corrupt: metadata indicates a zero row count but there is at least one non-empty row group.",
    "Cannot schedule query: no registered backends available.",
    "Key already present in Kudu table '$0'.",
    "Not found in Kudu table '$0': $1",
    "Error in Kudu table '$0': $1",
    "Column '$0': unsupported Avro type '$1'",
    "Column '$0': invalid Avro decimal type with precision = '$1' scale = '$2'",
    "Row with null value violates nullability constraint on table '$0'.",
    "Parquet file '$0' column '$1' contains an out of range timestamp. The valid date range is 1400-01-01..9999-12-31.",
    "Could not create files in any configured scratch directories (--scratch_dirs=$0) on backend '$1'. $2 of scratch is currently in use by this Impala Daemon ($3 by this query). See logs for previous errors that may have prevented creating or writing scratch files.",
    "Error reading $0 bytes from scratch file '$1' on backend $2 at offset $3: could only read $4 bytes",
    "Kudu table '$0' column '$1' contains an out of range timestamp. The valid date range is 1400-01-01..9999-12-31.",
    "Row of size $0 could not be materialized in plan node with id $1. Increase the max_row_size query option (currently $2) to process larger rows.",
    "Failed to verify generated IR function $0, see log for more details.",
    "Failed to get minimum memory reservation of $0 on daemon $1:$2 for query $3 due to following error: $4Memory is likely oversubscribed. Reducing query concurrency or configuring admission control may help avoid this error.",
    "Rejected query from pool $0: $1",
    "Admission for query exceeded timeout $0ms in pool $1. Queued reason: $2",
    "Failed to create thread $0 in category $1: $2",
    "Disk I/O error on $0: $1",
    "DataStreamRecvr for fragment=$0, node=$1 is closed already",
    "Kerberos principal should be of the form: <service>/<hostname>@<realm> - got: $0",
    "The input size is too large for LZ4 compression: $0",
    "InitAuth() called multiple times with different names. Was called with $0. Now using $1.",
    "Can not read Parquet file $0 with deprecated BIT_PACKED encoding for rep or def levels. Support was removed in Impala 3.0 - see IMPALA-6077.",
    "Row batch cannot be serialized: size of $0 bytes exceeds supported limit of $1",
    "The library $0 last modified time $1 does not match the expected last modified time $2. Run 'refresh functions <db name>'.",
    "Error reading $0 bytes from scratch file '$1' on backend $2 at offset $3: verification of read data failed.",
    "Cancelled in $0",
    "Server is being shut down: $0.",
    "Parquet file '$0' column '$1' contains a timestamp with invalid time of day. The time of day should be 0 <= and < 24 hour (in nanoseconds).",
    "File '$0' is corrupt: error decoding BOOLEAN value with encoding $1 at offset $2",
    "Failed to submit $0 to thread pool after waiting $1 seconds",
    "$0 failed to finish before the $1 second timeout",
    "Failed due to unreachable impalad(s): $0",
    "Session expired due to inactivity",
    "Query $0 expired due to client inactivity (timeout is $1)",
    "Query $0 expired due to execution time limit of $1",
    "Query $0 terminated due to CPU limit of $1",
    "Query $0 terminated due to scan bytes limit of $1",
    "Query $0 terminated due to rows produced limit of $1. Unset or increase NUM_ROWS_PRODUCED_LIMIT query option to produce more rows.",
]

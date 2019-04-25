<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Aws\S3\S3Client;

use Log;
class AWS3 extends Controller
{
    public function index()
    {
                //Get an instance of S3 Client. This is one one to do it:
        $s3Client = new S3Client([
            'version'     => 'latest',
            'region'      => env('AWS_DEFAULT_REGION'), //Region of the bucket
            'credentials' => array(
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret'  => env('AWS_SECRET_ACCESS_KEY'),
            )
        ]);

        //Get a command to GetObject
        $cmd = $s3Client->getCommand('GetObject', [
            'Bucket' => env('AWS_BUCKET'),
            'Key'    => 'images/1554336009test.jpg'
        ]);

        //The period of availability
        $request = $s3Client->createPresignedRequest($cmd, '+10 minutes');

        //Get the pre-signed URL
        $signedUrl = (string) $request->getUri();

        Log::alert($signedUrl);
        return $signedUrl;
        // Log::alert(Storage::url('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png'));
        // Log::alert(Storage::disk('s3')->files('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png'));
        // if(Storage::exists('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png'))
        // {
        //     Log::alert('in GETT');
        //     return Storage::disk('s3')->get('https://s3.ca-central-1.amazonaws.com/tarefazz/man-156584__340.png');
        // }else
        // {
        //     return 'No Image';
        // }
//    public function index()
//    {
//        $url = 'https://s3.' . env('AWS_DEFAULT_REGION') . '.amazonaws.com/' . env('AWS_BUCKET') . '/images';
//        $headers = array(
//         'Content-Disposition' => 'inline',
//     );
//            $files = Storage::disk('s3')->files('images');
//            Log::alert(Storage::disk('s3')->url('images/1554336009test.jpg'));
// return $files;
    // return Storage::download($storage_path, $filename, $headers);
    //    $images = [];
    //    $files = Storage::disk('s3')->files('images');
    //    Log::alert('HEREE');
    //        foreach ($files as $file) {
    //            $images[] = [
    //                'name' => str_replace('images/', '', $file),
    //                'src' => $url . $file
    //            ];
    //        }
    //    return view('welcome', compact('images'));
   }
   public function store(Request $request)
   {
       $this->validate($request, [
           'image' => 'required|image|max:2048'
       ]);
       if ($request->hasFile('image')) {
           $file = $request->file('image');
           $name = time() . $file->getClientOriginalName();
           $filePath = 'images/' . $name;
           Storage::disk('s3')->put($filePath, file_get_contents($file));
       }
       return back()->withSuccess('Image uploaded successfully');
   }

   public function test (){
       Log::alert('heree');
   }
   public function destroy($image)
   {
       Storage::disk('s3')->delete('images/' . $image);
       return back()->withSuccess('Image was deleted successfully');
   }
}

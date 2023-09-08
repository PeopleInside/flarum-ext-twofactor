<?php

namespace IanM\TwoFactor\Api\Controller;

use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use IanM\TwoFactor\Event\Disabled;
use IanM\TwoFactor\Services\TwoFactorRestrictor;
use IanM\TwoFactor\Trait\TwoFactorAuthenticationTrait;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class DisableTwoFactorController implements RequestHandlerInterface
{
    use TwoFactorAuthenticationTrait;
    
    public function __construct(public Dispatcher $events, public TwoFactorRestrictor $restrictor)
    {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();

        // Check if the actor can disable 2FA
        if (!$this->restrictor->canDisable2FA($actor)) {
            // Return a response indicating that this user cannot disable 2FA
            throw new PermissionDeniedException('You are not allowed to disable 2FA.');
        }

        $user = User::find(Arr::get($request->getQueryParams(), 'id'));

        if ($user->id !== $actor->id && $actor->cannot('ianm-twofactor.manageOthers')) {
            throw new PermissionDeniedException('You cannot manage 2FA for another user.');
        }

        if (!$this->twoFactorActive($user)) {
            return new ModelNotFoundException();
        }

        $user->twoFactor->delete();

        $this->events->dispatch(new Disabled($user, $actor));

        return new EmptyResponse(204);
    }
}
